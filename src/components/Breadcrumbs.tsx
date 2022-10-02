import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import { Steps } from '../helpers/steps';
import { useDispatch } from 'react-redux';
import { handleSetStep } from '../redux/reducer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      display: 'flex',
    },
    icon: {
      marginRight: theme.spacing(0.5),
      width: 20,
      height: 20,
    },
  })
);

export const IconBreadcrumbs = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  function handleClick(event: any, step: Steps) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
    dispatch(handleSetStep(step));
  }

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link
        color="inherit"
        onClick={(e: any) => handleClick(e, Steps.SignUpInfo)}
        className={classes.link}
      >
        <HomeIcon className={classes.icon} />
        Sign Up Info
      </Link>
      <Link
        color="inherit"
        onClick={(e: any) => handleClick(e, Steps.PersonalInfo)}
        className={classes.link}
      >
        <WhatshotIcon className={classes.icon} />
        Personal Info
      </Link>
      <Typography color="textPrimary" className={classes.link}></Typography>
    </Breadcrumbs>
  );
};
