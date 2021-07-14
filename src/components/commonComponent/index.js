import { Card, CardContent, Grid, Typography } from '@material-ui/core'

export const renderDisplayCard = ({ key, value, index, color }) => (
  <Grid item xs={6} sm={3} key={index}>
    <Card raised>
      <CardContent>
        <Grid container>
          <Grid
            item
            xs='auto'
            style={{ background: color, paddingRight: '5px' }}
          ></Grid>
          <Grid item xs={11}>
            <Typography
              variant='body1'
              component='h6'
              align='center'
              color='textSecondary'
              gutterBottom
            >
              {key}
            </Typography>
            <Typography
              variant='h5'
              component='h5'
              align='center'
              style={{ color: color }}
            >
              {value}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  </Grid>
)
