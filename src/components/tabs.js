import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import LineChartV3 from "./charts/LineChartV3";
import CustomizedTables from "./table/tableCard";
import { Grid } from "@mui/material";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Line chart" {...a11yProps(0)} />
          <Tab label="Table Dashboard" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <Grid container>
        <Grid item sm={6} xs={12}>
          <CustomTabPanel value={value} index={0}>
            <LineChartV3 />
          </CustomTabPanel>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item sm={6} xs={12}>
          <CustomTabPanel value={value} index={1}>
            <CustomizedTables />
          </CustomTabPanel>
        </Grid>
      </Grid>
    </Box>
  );
}
