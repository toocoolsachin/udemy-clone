import React from 'react';
import data from '../data.json';
import '../App.css';
import { Link } from 'react-router-dom';
import {
  makeStyles,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    marginTop: 200,
    margin: 'auto',
  },
  media: {
    height: 140,
  },
});

const Home = () => {
  const { courses } = data;
  const classes = useStyles();

  return (
    <div className='App'>
      {courses.map((course) => (
        <Link key={course.name} to={`/course/${course.name}`}>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image='/images/thumbnail.jpg'
                title={course.name}
              />
              <CardContent>
                <Typography gutterBottom variant='h5' component='h2'>
                  {course.name}
                </Typography>
                <Typography variant='h6' color='textSecondary' component='p'>
                  {course.author}
                </Typography>
                <Typography variant='h5' color='textSecondary' component='p'>
                  ${course.price}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default Home;
