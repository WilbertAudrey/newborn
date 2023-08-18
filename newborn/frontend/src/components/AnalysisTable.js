import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as api from "../api/index";

function AnalysisTable() {
  const [analysisData, setAnalysisData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  const handleDateChange = (date) => {
    setSelectedYear(date.getFullYear());
    setSelectedMonth(date.getMonth() + 1);
  };

  useEffect(() => {
    api.getAnalysisData(selectedYear, selectedMonth)
      .then((response) => {
        setAnalysisData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching analysis data:", error);
      });
  }, [selectedYear, selectedMonth]);


  const maleData = analysisData.filter((entry) => entry.gender === "L");
  const femaleData = analysisData.filter((entry) => entry.gender === "P");

  return (
    <div>
      <Link to="/">
        <Button variant="outlined">&larr; Go Back</Button>
      </Link>
      <h2>Analysis Table</h2>
      <div>
        <DatePicker
          selected={new Date(selectedYear, selectedMonth - 1, 1)}
          onChange={handleDateChange}
          showMonthYearPicker
          dateFormat="MM-yyyy"
        />
      </div>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <h3>Male Analysis</h3>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Year</TableCell>
                      <TableCell>Month</TableCell>
                      <TableCell>Male Count</TableCell>
                      <TableCell>Total Count</TableCell>
                      <TableCell>Avg Weight (Male)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {maleData.map((entry) => (
                      <TableRow key={entry.year + entry.month}>
                        <TableCell>{entry.year}</TableCell>
                        <TableCell>{entry.month}</TableCell>
                        <TableCell>{entry.male_count}</TableCell>
                        <TableCell>{entry.total_count}</TableCell>
                        <TableCell>{entry.avg_weight_male}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <h3>Female Analysis</h3>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Year</TableCell>
                      <TableCell>Month</TableCell>
                      <TableCell>Female Count</TableCell>
                      <TableCell>Total Count</TableCell>
                      <TableCell>Avg Weight (Female)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {femaleData.map((entry) => (
                      <TableRow key={entry.year + entry.month}>
                        <TableCell>{entry.year}</TableCell>
                        <TableCell>{entry.month}</TableCell>
                        <TableCell>{entry.female_count}</TableCell>
                        <TableCell>{entry.total_count}</TableCell>
                        <TableCell>{entry.avg_weight_female}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default AnalysisTable;
