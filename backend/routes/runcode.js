import express from "express";
const router = express.Router();
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

router.post("/", async (req, res) => {
  try {
    const { code, language } = req.body;
    console.log(code, language);
    const langMap = {
      javascript: 63,
      typescript: 74,
      python: 71,
      java: 62,
      cpp: 54,
      c: 50,
      csharp: 51,
      php: 68,
      swift: 83,
      kotlin: 78,
      dart: 90,
      rust: 73,
      go: 60,
      scala: 81,
      haskell: 61,
      ruby: 72,
      perl: 85,
      lua: 64,
      bash: 46,
      r: 80,
      matlab: 93,
      julia: 87,
      ocaml: 88,
      fsharp: 86,
      elixir: 57,
      erlang: 58,
      fortran: 59,
      cobol: 77,
      vbnet: 84,
    };

    const getOutput = await axios.post(
      "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
      {
        source_code: code,
        language_id: langMap[language],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": process.env.RUN_API_KEY,
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        },
      }
    );
    const result = getOutput.data;
    res.json({ output: result.stdout || result.stderr });
  } catch (err) {
    console.log("Error : ", err);
  }
});

export default router;
