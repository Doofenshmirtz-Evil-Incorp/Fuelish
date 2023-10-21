document.addEventListener("DOMContentLoaded", function() {
    // Sample data for a single district (replace with your actual data)
    const districtData = {
      district: "Sample District",
      labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7", "Day 8", "Day 9", "Day 10"],
      data: [10, 15, 12, 17, 20, 22, 18, 16, 14, 11],
    };
  
    // Get the canvas element
    const ctx = document.getElementById("myChart").getContext("2d");
  
    let myChart; // Declare myChart variable
  
    function createChart(data) {
      myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: data.labels,
          datasets: [
            {
              label: data.district,
              data: data.data,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  
    // Create the initial chart
    createChart(districtData);
  
    function updateChart(newData) {
      // Clear the previous chart
      if (myChart) {
        myChart.destroy();
      }
  
      // Create the new chart with the provided data
      createChart(newData);
    }
  
    // Example usage to update the chart with a new district's data
    // Replace newDistrictData with actual district data
    const newDistrictData = {
      district: "New District",
      labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7", "Day 8", "Day 9", "Day 10"],
      data: [15, 18, 14, 19, 22, 21, 19, 17, 16, 14],
    };
  
    updateChart(newDistrictData);
  });
  