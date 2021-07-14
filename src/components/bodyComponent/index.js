import React, { useState, useEffect } from 'react'
import {
  Box,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from '@material-ui/core'
import { getGlobalSummary, getRegionalSummary } from '../../covid19TrackerApi'
import { renderDisplayCard } from '../commonComponent'
import { blue, red, green, blueGrey } from '@material-ui/core/colors'
import CountUp from 'react-countup'
import Flag from '../../assets/images/indianFlag.png'
import Chart from 'chart.js'

const BodyComponent = () => {
  const [globalCases, setGlobalCases] = useState({})
  const [indianCases, setIndianCases] = useState([])
  const [graphFetched, setGraphFetched] = useState(false)

  useEffect(() => {
    getGlobalSummary().then(({ data: { Global } }) => {
      setGlobalCases({
        'New Cases': Global.NewConfirmed,
        'Total Cases': Global.TotalConfirmed,
        'New Deaths': Global.NewDeaths,
        'Total Deaths': Global.TotalDeaths,
        'New Recovery': Global.NewRecovered,
        'Total Recovery': Global.TotalRecovered,
      })
    })
  }, [])

  useEffect(() => {
    !graphFetched &&
      getRegionalSummary().then(({ data: { cases_time_series } }) => {
        const data = {}

        cases_time_series.forEach((item, i) => {
          const date = new Date(item.date)
          const currentMonth = date.getMonth()
          const currentYear = date.getFullYear()

          if (!data[currentYear]) {
            data[currentYear] = {}
          }
          if (!data[currentYear][currentMonth]) {
            data[currentYear][currentMonth] = +item.dailyconfirmed
          } else {
            data[currentYear][currentMonth] += +item.dailyconfirmed
          }
        })
        const regionalCases = Object.keys(data['2021']).map((item, i) => {
          return data['2021'][item]
        })
        setIndianCases(regionalCases)
        setGraphFetched(true)
      })
    renderGraph({
      labels: [
        'jan',
        'feb',
        'mar',
        'apr',
        'may',
        'jun',
        'jul',
        'aug',
        'sep',
        'oct',
        'nov',
        'dec',
      ],
      title: 'Covid Cases',
      data: indianCases,
      bgColor: blue[200],
      borderColor: blue[800],
    })
  }, [graphFetched, indianCases])

  return (
    <Box mt={2} mr={2} ml={2}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12}>
          <Typography variant='h6' gutterBottom style={{ color: blue[700] }}>
            Global Status
          </Typography>
        </Grid>
        {!Object.entries(globalCases).length ? (
          <Box
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '200px',
              width: '100%',
            }}
          >
            <Typography variant='body1' color='textSecondary' align='center'>
              Loading Global State ...
            </Typography>
            <br />
            <CircularProgress color='secondary'></CircularProgress>
          </Box>
        ) : (
          Object.entries(globalCases).map((item, i) =>
            renderDisplayCard({
              key: item[0],
              value: <CountUp start={0} end={item[1]} duration={2} />,
              index: i,
              color:
                item[0] === 'New Cases'
                  ? blue[500]
                  : item[0] === 'Total Cases'
                  ? blue[500]
                  : item[0] === 'New Deaths'
                  ? red[500]
                  : item[0] === 'Total Deaths'
                  ? red[500]
                  : green[500],
            })
          )
        )}
      </Grid>
      <Box mt={4}>
        <Grid container>
          <Grid item xs={12} sm={12}>
            <Typography variant='h6' gutterBottom style={{ color: blue[700] }}>
              Regional Status
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Box p={(1, 1)} style={{ display: 'flex' }}>
              <img src={Flag} alt='Flag' width='40' height='auto' />
              <Typography
                variant='body1'
                component='h6'
                style={{ color: blueGrey[700], lineHeight: '50px' }}
              >
                India
              </Typography>
            </Box>
            <CardContent>
              <canvas id='myChart' width='400' height='400'></canvas>
            </CardContent>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export const renderGraph = ({ labels, title, data, bgColor, borderColor }) => {
  let ctx = document.getElementById('myChart').getContext('2d')
  let myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: title,
          data: data,
          backgroundColor: bgColor,
          borderColor: borderColor,
          borderWidth: 3,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            gridLines: {
              color: 'rgba(0, 0, 0, 0)',
            },
            ticks: {
              beginAtZero: true,
              callback: function (label, index, dataOfLabels) {
                return label / 1000000 + 'm'
              },
            },
          },
        ],
        xAxes: [
          {
            gridLines: {
              color: 'rgba(0, 0, 0, 0)',
            },
          },
        ],
      },
      responsive: true,
      maintainAspectRatio: false,
    },
  })
  return myChart
}
export default BodyComponent
