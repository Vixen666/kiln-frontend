import React, { useEffect, useCallback, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBurns, selectBurn } from "../../store/burnSlice";
import useApiFetcher from "../../utils/apiUtils";
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';

function BurnHistoryPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { burns } = useSelector((state) => state.burn.data);
  const { status, error } = useSelector((state) => state.burn);
  const { fetchData } = useApiFetcher();

  const [sortConfig, setSortConfig] = useState({
    key: "burn_id",
    direction: "ascending",
  });
  const [filterConfig, setFilterConfig] = useState({
    burn_id: [],
    oven_id: [],
    template_id: [],
    description: [],
    status: [],
    start_date: [],
    end_date: [],
  });

  const applyFilters = (burns) => {
    return burns.filter((burn) => {
      return Object.keys(filterConfig).every((key) => {
        if (filterConfig[key].length === 0) return true;
        return filterConfig[key].includes(burn[key] ? burn[key].toString() : '');
      });
    });
  };

  const applySort = (burns) => {
    return [...burns].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  };

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const fetchBurnsData = useCallback(() => {
    fetchData(fetchAllBurns(), {
      success: "Burns loaded successfully!",
      error: "Failed to load burns.",
      error2: "Network problem while fetching burns in component.",
    });
  }, [fetchData]);

  useEffect(() => {
    if (status === "idle") {
      fetchBurnsData();
    }
  }, [status, fetchBurnsData]);

  const handleBurnSelect = (burn_id) => {
    dispatch(selectBurn(burn_id));
    navigate("/burn-settings");
  };

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  const uniqueValues = (key) => [
    ...new Set(burns.map((burn) => (burn[key] ? burn[key].toString() : ""))),
  ];

  function HeaderRow({ requestSort, sortConfig }) {
    const getSortArrow = (column) => {
      if (sortConfig.key === column) {
        return sortConfig.direction === 'ascending' ? <ArrowUpward /> : <ArrowDownward />;
      }
      return <ArrowUpward />;
    };
  
    return (
      <TableRow>
        <TableCell>
          <MultiSelectDropdown 
            column="burn_id" 
            options={uniqueValues('burn_id')} 
            filterConfig={filterConfig} 
            setFilterConfig={setFilterConfig} 
            title="Burn" />
          <span onClick={() => requestSort('burn_id')}>{getSortArrow('burn_id')}</span>
        </TableCell>
        <TableCell align="right">
          <MultiSelectDropdown 
            column="oven_id" 
            options={uniqueValues('oven_id')} 
            filterConfig={filterConfig} 
            setFilterConfig={setFilterConfig} 
            title="Oven" />
          <span onClick={() => requestSort('oven_id')}>{getSortArrow('oven_id')}</span>
        </TableCell>
        <TableCell align="right">
          <MultiSelectDropdown 
            column="template_id" 
            options={uniqueValues('template_id')} 
            filterConfig={filterConfig} 
            setFilterConfig={setFilterConfig} 
            title="Template" />
          <span onClick={() => requestSort('template_id')}>{getSortArrow('template_id')}</span>
        </TableCell>
        <TableCell align="right">
          <MultiSelectDropdown 
            column="description" 
            options={uniqueValues('description')} 
            filterConfig={filterConfig} 
            setFilterConfig={setFilterConfig} 
            title="Description" />
          <span onClick={() => requestSort('description')}>{getSortArrow('description')}</span>
        </TableCell>
        <TableCell align="right">
          <MultiSelectDropdown 
            column="status" 
            options={uniqueValues('status')} 
            filterConfig={filterConfig} 
            setFilterConfig={setFilterConfig} 
            title="Status" />
          <span onClick={() => requestSort('status')}>{getSortArrow('status')}</span>
        </TableCell>
        <TableCell align="right">
          <MultiSelectDropdown 
            column="start_date" 
            options={uniqueValues('start_date')} 
            filterConfig={filterConfig} 
            setFilterConfig={setFilterConfig} 
            title="Start Date" />
          <span onClick={() => requestSort('start_date')}>{getSortArrow('start_date')}</span>
        </TableCell>
        <TableCell align="right">
          <MultiSelectDropdown 
            column="end_date" 
            options={uniqueValues('end_date')} 
            filterConfig={filterConfig} 
            setFilterConfig={setFilterConfig} 
            title="End Date" />
          <span onClick={() => requestSort('end_date')}>{getSortArrow('end_date')}</span>
        </TableCell>
      </TableRow>
    );
  }

  function MultiSelectDropdown({
    column,
    options,
    filterConfig,
    setFilterConfig,
    title,
  }) {
    const handleChange = (event) => {
      setFilterConfig((prevState) => ({
        ...prevState,
        [column]: event.target.value,
      }));
    };

    return (
      <FormControl style={{ minWidth: 150 }}>
        <InputLabel>{title}</InputLabel>
        <Select
          multiple
          value={filterConfig[column]}
          onChange={handleChange}
          renderValue={(selected) => selected.join(", ")}
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              <Checkbox checked={filterConfig[column].indexOf(option) > -1} />
              <ListItemText primary={option} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }

  function TableRows({ sortedBurns }) {
    return sortedBurns.map((burn) => (
      <TableRow key={burn.burn_id} onClick={()=> handleBurnSelect(burn.burn_id)}>
        <TableCell>{burn.burn_id}</TableCell>
        <TableCell align="right">{burn.oven_id}</TableCell>
        <TableCell align="right">{burn.template_id}</TableCell>
        <TableCell align="right">{burn.description}</TableCell>
        <TableCell align="right">{burn.status}</TableCell>
        <TableCell align="right">{burn.start_date}</TableCell>
        <TableCell align="right">{burn.end_date}</TableCell>
      </TableRow>
    ));
  }

  const filteredBurns = applyFilters(burns);
  const sortedBurns = applySort(filteredBurns);

  return (
    <div>
      <Table>
        <TableHead>
          <HeaderRow requestSort={requestSort} sortConfig={sortConfig} />
        </TableHead>
        <TableBody>
          <TableRows sortedBurns={sortedBurns} />
        </TableBody>
      </Table>
    </div>
  );
}

export default BurnHistoryPage;
