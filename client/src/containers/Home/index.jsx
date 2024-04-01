import { Sheet, Grid } from "@mui/joy";

const Home = () => {
  return (
    <Grid container spacing={2} sx={{ flexGrow: 1 }}>
      <Grid xs={12} sm={6}>
        <div style={{ background: "red" }}>yeet</div>
      </Grid>
      <Grid xs={12} sm={6}>
        <div style={{ background: "red" }}>yeet</div>
      </Grid>
    </Grid>
  );
};

export default Home;
