import React, { useState, useEffect } from 'react';
import { makeStyles, Grid, Paper, Typography, Button } from '@material-ui/core';
import ReactPlayer from 'react-player';
import data from '../data.json';
import Duration from './Duration';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 50,
  },
  paper: {
    padding: theme.spacing(4),
    margin: 'auto',
    width: 1200,
    height: 600,
  },
}));

const CourseDetails = () => {
  const classes = useStyles();
  const { courses } = data;

  let player = React.createRef();

  useEffect(() => {
    console.log(player);
    console.log(player.current.getCurrentTime());
  });

  const [isEnrolled, setIsEnrolled] = useState(false);

  const [state, setState] = useState({
    playing: false,
    controls: true,
    played: 0,
    loaded: 0,
    duration: 0,
  });

  const handlePlay = () => {
    console.log('onPlay');
    setState({ ...state, playing: true });
  };

  const handlePause = () => {
    console.log('onPause');
    setState({ ...state, playing: false });
  };

  const handleSeekMouseDown = (e) => {
    setState({ ...state, seeking: true });
  };

  const handleSeekChange = (e) => {
    setState({ ...state, played: parseFloat(e.target.value) });
  };

  const handleSeekMouseUp = (e) => {
    setState({ ...state, seeking: false });
    player.current.seekTo(parseFloat(e.target.value));
  };

  const handleProgress = (state) => {
    console.log('onProgress', state);
    // We only want to update time slider if we are not currently seeking
    if (state.seeking) {
      setState(state);
    }
  };

  const handleDuration = (duration) => {
    console.log('onDuration', duration);
    setState({ ...state, duration });
  };

  const handlePlayPause = () => {
    setState({ ...state, playing: !playing });
  };

  const handleStop = () => {
    setState({ ...state, playing: false });
  };

  const alertEnroll = () => {
    let currentTime = player.current.getCurrentTime();
    if (!isEnrolled && currentTime >= 2) {
      alert('Please enroll to watch full video');
    }
  };

  const { playing, controls, played, loaded, duration } = state;

  return (
    <div className={classes.root}>
      {courses.map((course) => (
        <Paper key={course.name} className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <ReactPlayer
                ref={player}
                url={course.url}
                controls={controls}
                playing={playing}
                width='550px'
                onPlay={handlePlay}
                onPause={handlePause}
                onProgress={handleProgress}
                onDuration={handleDuration}
              />
              <table>
                <tbody>
                  <tr>
                    <th>Controls</th>
                    <td>
                      <button onClick={handleStop}>Stop</button>
                      <button onClick={handlePlayPause}>
                        {playing ? 'Pause' : 'Play'}
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <th>Seek</th>
                    <td>
                      <input
                        type='range'
                        min={0}
                        max={0.999999}
                        step='any'
                        value={played}
                        onMouseDown={handleSeekMouseDown}
                        onChange={handleSeekChange}
                        onMouseUp={handleSeekMouseUp}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <table>
                <tbody>
                  <tr>
                    <th>Playing</th>
                    <td>{playing ? 'true' : 'false'}</td>
                  </tr>
                  <tr>
                    <th>Played</th>
                    <td>{played}</td>
                  </tr>
                  <tr>
                    <th>Loaded</th>
                    <td>{loaded}</td>
                  </tr>
                  <tr>
                    <th>Duration</th>
                    <td>
                      <Duration seconds={duration} />
                    </td>
                  </tr>
                  <tr>
                    <th>Elapsed</th>
                    <td>
                      <Duration seconds={duration * played} />
                    </td>
                  </tr>
                  <tr>
                    <th>Remaining</th>
                    <td>
                      <Duration seconds={duration * (1 - played)} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </Grid>
            <Grid item xs={6} sm container>
              <Grid item xs container direction='column' spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant='subtitle1'>
                    {course.category}
                  </Typography>
                  <Typography variant='h4' gutterBottom>
                    {course.name}
                  </Typography>
                  <Typography variant='h6' color='textSecondary'>
                    {course.description}
                  </Typography>
                  <Typography
                    variant='body2'
                    color='textSecondary'
                    component='p'
                    style={{ marginTop: 15 }}
                  >
                    Created By {course.author}
                  </Typography>
                  <Typography
                    variant='h4'
                    color='textSecondary'
                    style={{ marginTop: 15 }}
                  >
                    ${course.price}
                  </Typography>
                  <Button
                    style={{ marginTop: 15 }}
                    variant='contained'
                    color='secondary'
                  >
                    Enroll
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </div>
  );
};

export default CourseDetails;
