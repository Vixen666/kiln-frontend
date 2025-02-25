// src/store/templateSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import config from "../config";

export const fetchAllTemplates = createAsyncThunk(
  "template/fetchAllTemplates",
  async (_, { rejectWithValue }) => {
    const url = `${config.apiUrl}/api/TemplateService/Get_All`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue("Network problem while fetching templates.");
    }
  }
);

export const fetchTemplateById = createAsyncThunk(
  "template/fetchTemplateById",
  async (templateId, { rejectWithValue }) => {
    const url = `${config.apiUrl}/api/TemplateService/Get_Cruve?p_template_id=${templateId}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue("Error fetching template data");
    }
  }
);

const recalculateData = (data) => {
  let cumulativeDuration = 0;
  let previousPoint = null;
  return data.map((point, index) => {
    cumulativeDuration += point.time;

    let color = "green"; // Default color
    let tempChangePerMinute = "As fast as possible"; // Default text

    if (previousPoint) {
      // Calculate temperature change per minute
      if (point.time > 0) {
        // To avoid division by zero
        tempChangePerMinute =
          (point.temperature - previousPoint.temperature) / point.time;
        // Determine color based on temperature change
        color =
          tempChangePerMinute > 0
            ? "red"
            : tempChangePerMinute < 0
            ? "blue"
            : "green";
      }
    }

    // Update previousPoint and its cumulativeDuration for the next iteration
    previousPoint = { ...point, cumulativeDuration };

    return {
      ...point,
      color,
      cumulativeDuration,
      tempChangePerMinute:
        tempChangePerMinute === "As fast as possible"
          ? tempChangePerMinute
          : tempChangePerMinute.toFixed(2), // Add the calculated temperature change per minute, formatted to 2 decimal places if it's a number
    };
  });
};

export const updateTemplateCurve = createAsyncThunk(
  "template/updateTemplateCurve",
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const templateId = state.template.data.selected.templateId;
    const curves = state.template.data.selected.templateData;
    const url = `${config.apiUrl}/Template_Curve_Api_Update_Template_Curve`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ template_id: templateId, curves }),
      });
      if (!response.ok) {
        throw new Error("Failed to update template curve");
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue("Error updating template curve");
    }
  }
);

export const insertTemplate = createAsyncThunk(
  "template/insertTemplate",
  async (templateName, { rejectWithValue }) => {
    const url = `${config.apiUrl}/api/TemplateService/Insert`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: templateName }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data.template_id; // Assuming the response contains the new template_id
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const templateSlice = createSlice({
  name: "template",
  initialState: {
    data: {
      templates: [],
      selected: {
        templateId: null,
        templateData: {},
      },
      newTemplate:{show: false, name: ""}
    },
    status: "idle",
    error: null,
  },
  reducers: {
    handleCurveChange: (state, action) => {
      const { index, field, value } = action.payload;
      state.data.selected.templateData[index][field] = parseFloat(value);
      state.data.selected.templateData = recalculateData(
        state.data.selected.templateData
      );
    },
    deleteDataPoint: (state, action) => {
      const sequence = action.payload;
      // Filter out the point with the specific sequence
      const updatedCurve = state.data.selected.templateData.filter(
        (point) => point.sequence !== sequence
      );

      // Decrease the sequence number by 1 for all points with a sequence number greater than the one removed
      const adjustedCurve = updatedCurve.map((point) => {
        if (point.sequence > sequence) {
          return { ...point, sequence: point.sequence - 1 };
        }
        return point;
      });

      state.data.selected.templateData = recalculateData(adjustedCurve);
    },
    duplicateDataPoint: (state, action) => {
      const { index } = action.payload;
      const pointToCopy = state.data.selected.templateData[index];
      const newPoint = { ...pointToCopy, sequence: pointToCopy.sequence + 1 };
      const updatedCurve = state.data.selected.templateData.map(
        (point, idx) => {
          if (idx > index) {
            return { ...point, sequence: point.sequence + 1 };
          }
          return point;
        }
      );

      updatedCurve.splice(index + 1, 0, newPoint);

      state.data.selected.templateData = recalculateData(updatedCurve);
    },
    addDataPoint: (state) => {
      const newPoint = {
        sequence: state.data.selected.templateData.length + 1,
        time: 0,
        temperature: 0,
      };
      state.data.selected.templateData.push(newPoint);
      state.data.selected.templateData = recalculateData(
        state.data.selected.templateData
      );
    },
    selectTemplate: (state, action) => {
      console.log(action.payload);
      const selectedTemplate = state.data.templates.find(
        (template) => template.template_id === action.payload
      );
      if (
        selectedTemplate &&
        state.data.selected.templateId !== action.payload
      ) {
        state.data.selected = {
          templateId: action.payload,
          templateData: {},
        };
      }
    },
    showNewTemplateForm: (state) => {
      state.data.newTemplate.show = true;
    },
    hideNewTemplateForm: (state) => {
      state.data.newTemplate.show = false;
    },
    setNewTemplateName: (state, action) => {
      state.data.newTemplate.name = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTemplates.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllTemplates.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data.templates = action.payload;
      })
      .addCase(fetchAllTemplates.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchTemplateById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTemplateById.fulfilled, (state, action) => {
        state.data.selected.templateData = recalculateData(action.payload);
        state.status = "succeeded";
      })
      .addCase(fetchTemplateById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateTemplateCurve.pending, (state) => {
        state.status = "saving";
      })
      .addCase(updateTemplateCurve.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(updateTemplateCurve.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(insertTemplate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(insertTemplate.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data.newTemplate.show = false;
        state.data.newTemplate.name = "";
      })
      .addCase(insertTemplate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const {
  selectTemplate,
  handleCurveChange,
  deleteDataPoint,
  duplicateDataPoint,
  showNewTemplateForm,
  hideNewTemplateForm,
  setNewTemplateName,
  addDataPoint
} = templateSlice.actions;
export default templateSlice.reducer;
