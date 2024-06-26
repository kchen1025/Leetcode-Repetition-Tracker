import { Grid } from "@mui/joy";
import TimeTaken from "./components/TimeTaken";
import TimeTakenByTopic from "./components/TimeTakenByTopic";
import StrugglesByTopic from "./components/StrugglesByTopic";
import CalendarByTopic from "./components/CalendarByTopic";

const Home = () => {
  return (
    <Grid container spacing={2} sx={{ justifyContent: "center", flexGrow: 1 }}>
      <Grid l={12} xl={6}>
        <TimeTaken />
      </Grid>
      <Grid l={12} xl={6}>
        <TimeTakenByTopic />
      </Grid>
      <Grid l={12} xl={6}>
        <StrugglesByTopic />
      </Grid>
      <Grid l={12} xl={6}>
        <CalendarByTopic />
      </Grid>
    </Grid>
  );
};

export default Home;
