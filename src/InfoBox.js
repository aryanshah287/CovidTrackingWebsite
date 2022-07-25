import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import './InfoBox.css';

function InfoBox({title, cases, total}) {
  return (
    <div>
      <Card className='infoBox' id="box">
          <CardContent>
              {/*Title Coronavirus*/}

              {/*120k No. of cases*/}

              {/*1.2 M Total*/}

            <Typography className='infoBox_title'color={"textSecondary"}>
                <h3>{title}</h3>
            </Typography>
                <h2>{cases}</h2>
            <Typography className='infoBox_total'color={"textSecondary"}>
                <h3>{total} Total</h3>
            </Typography>
          </CardContent>
      </Card>
    </div>
  )
}

export default InfoBox
