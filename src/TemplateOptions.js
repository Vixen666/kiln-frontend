import React, { useEffect, useCallback } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActionArea,
  CardHeader,
  Paper,
  IconButton,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import TemplateDisplay from "./TemplateDisplay";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllTemplates,
  fetchTemplateById,
  selectTemplate,
  showNewTemplateForm,
  hideNewTemplateForm
} from "./store/templateSlice";
import useApiFetcher from "./utils/apiUtils";
import NewTemplate from "./Template/newTemplate";

const cardStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  cursor: "pointer",
  
};

function TemplateOptions() {
  const dispatch = useDispatch();
  const { templates, selected } = useSelector((state) => state.template.data);
  const { status, error } = useSelector((state) => state.template);
  const { fetchData } = useApiFetcher();
  const newTemplate = useSelector((state) => state.template.data.newTemplate);

  const handleNewTemplate = () => {
    dispatch(showNewTemplateForm());
  };

  const fetchTemplatesData = useCallback(() => {
    fetchData(fetchAllTemplates(), {
      success: "",
      error: "Failed to load templates.",
      error2: "Network problem while fetching templates in component.",
    });
  }, [fetchData]);

  useEffect(() => {
    if (status === "idle") {
      fetchTemplatesData();
    }
  }, [status, fetchTemplatesData]);

  const handleTemplateSelect = (templateId) => {
    dispatch(selectTemplate(templateId));
    fetchData(fetchTemplateById(templateId), {
      success: "",
      error: "Failed to load template.",
      error2: "Network problem while fetching template in component.",
    });
    dispatch(hideNewTemplateForm()); 
  };

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <>
      <Paper
        elevation={15}
        style={{
          padding: "20px",
          marginBottom: "20px",
          marginTop: "20px",
          background: "#001c27",
        }}
      >
        <Grid container spacing={2} justifyContent="center">
          {templates &&
            templates.map((template) => (
              <Grid item xs={12} sm={12} md={12} key={template.template_id}>
                <Card
                  variant="outlined"
                  style={{ ...cardStyle, flexDirection: "column" }}
                  onClick={() => handleTemplateSelect(template.template_id)}
                >
                  <CardHeader
                  title={template.name}
                    titleTypographyProps={{ variant: "h6" }}
                    style={{ paddingBottom: 0, paddingTop: 0 }}>
                    
                  </CardHeader>
                </Card>
              </Grid>
            ))}
          <Grid item xs={12} sm={12} md={12}>
            <Card
              variant="outlined"
              style={cardStyle}
              onClick={handleNewTemplate}
            >
              <IconButton color="primary" aria-label="add new oven" style={{ paddingBottom: 0, paddingTop: 0 }}>
                <AddCircleOutlineIcon style={{ fontSize: 30 }} />
              </IconButton>
            </Card>
          </Grid>
        </Grid>
      </Paper>
      {newTemplate && newTemplate.show && <NewTemplate />}
      {selected.templateId && !newTemplate.show && <TemplateDisplay />}
    </>
  );
}

export default TemplateOptions;
