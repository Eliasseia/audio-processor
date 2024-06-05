const express = require('express');
const { exec } = require('child_process');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/process-audio', (req, res) => {
  const { inputUrl, outputUrl } = req.body;
  const command = `ffmpeg -i ${inputUrl} -af "silenceremove=stop_periods=-1:stop_duration=0.5:stop_threshold=-50dB,atempo=1.25,volume=10dB" ${outputUrl}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).send(`Error processing audio: ${stderr}`);
    }
    res.send(`Audio processed successfully: ${stdout}`);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
