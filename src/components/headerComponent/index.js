import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core'
import { indigo } from '@material-ui/core/colors'
import BubbleChartOutlinedIcon from '@material-ui/icons/BubbleChartOutlined'

const HeaderComponent = () => {
  return (
    <AppBar position='static' style={{ background: indigo['A400'] }}>
      <Toolbar>
        <IconButton edge='start' color='inherit' aria-label='menu'>
          <BubbleChartOutlinedIcon />
        </IconButton>
        <Typography variant='h6'>COVID-19 Tracker</Typography>
      </Toolbar>
    </AppBar>
  )
}

export default HeaderComponent
