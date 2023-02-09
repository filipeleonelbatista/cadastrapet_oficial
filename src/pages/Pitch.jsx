import { Box } from "@mui/material";

export default function Pitch() {
  return (
    <Box
      component="object"
      aria-label="pdf"
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#181818',
        overflowX: 'hidden',
      }}
      type="application/pdf"
      data="./images/pitch/Pitch.pdf"
    ></Box>
  );
}
