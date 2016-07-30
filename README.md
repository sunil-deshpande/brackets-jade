# JADE2HTML Brackets extension

This brackets extension allows user to compile jade to html. Two options can be passed to extension using .brackets.json, the brackets project file.
format of options to be passed from project file are as follows.
<br>
Below is sample for project structure
<pre>
  project root
  |
  ----jade/
  |
  ----sass/
  |
  ----public
  '
  '
  Other files and directories
</pre>

Contents of .bracket.json

<pre>
    {
     .
     .
     Project options 
     .
     .
      "jade.enabled": false,
      "path": {
        "jade/*.jade": {
          "jade.enabled": true,
          "jade.options": {
            "outputDir": "../public",
            "pretty": true
          }
        }
      }
    }
</pre>