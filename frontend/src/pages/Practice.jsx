import React from 'react'
import { Link } from 'react-router-dom'
import practiceStyles from './Practice.module.css'
import Header from '../components/Header'

const languages = [
  { name: 'JavaScript', state: { language: 'javascript' } },
  { name: 'TypeScript', state: { language: 'typescript' } },
  { name: 'Python', state: { language: 'python' } },
  { name: 'Java', state: { language: 'java' } },
  { name: 'C++', state: { language: 'cpp' } },
  { name: 'C', state: { language: 'c' } },
  { name: 'C#', state: { language: 'csharp' } },
  { name: 'PHP', state: { language: 'php' } },

  { name: 'Swift', state: { language: 'swift' } },
  { name: 'Kotlin', state: { language: 'kotlin' } },
  { name: 'Dart', state: { language: 'dart' } },

  { name: 'Rust', state: { language: 'rust' } },
  { name: 'Go', state: { language: 'go' } },
  { name: 'Scala', state: { language: 'scala' } },
  { name: 'Haskell', state: { language: 'haskell' } },

  { name: 'Ruby', state: { language: 'ruby' } },
  { name: 'Perl', state: { language: 'perl' } },
  { name: 'Lua', state: { language: 'lua' } },
  { name: 'Shell (Bash)', state: { language: 'bash' } },

  { name: 'R', state: { language: 'r' } },
  { name: 'MATLAB', state: { language: 'matlab' } },
  { name: 'Julia', state: { language: 'julia' } },

  { name: 'OCaml', state: { language: 'ocaml' } },
  { name: 'F#', state: { language: 'fsharp' } },
  { name: 'Elixir', state: { language: 'elixir' } },
  { name: 'Erlang', state: { language: 'erlang' } },

  { name: 'Fortran', state: { language: 'fortran' } },
  { name: 'COBOL', state: { language: 'cobol' } },
  { name: 'VB.NET', state: { language: 'vbnet' } },
]

const Practice = () => {
  return (
   <>
    <Header />
    <div className={practiceStyles.practiceContainer}>
      <h1 className={practiceStyles.heading}>Choose Your Language</h1>
      <p className={practiceStyles.subheading}>
        Pick a language to start solving problems and sharpen your skills
      </p>
      <div className={practiceStyles.languageGrid}>
        {languages.map((lang, index) => (
          <Link
            key={index}
            to="/problems"
            state={lang.state}
            className={practiceStyles.languageCard}
          >
            {lang.name}
          </Link>
        ))}
      </div>
    </div>
   </>
  )
}

export default Practice
