#  Brackets extension for JADE to HTML conversion.

This brackets extension allows user to compile jade(pug) to html on saving the document. Two options, output directory and pretty outotput, can be passed
to extension using .brackets.json, the brackets project file. format of options to be passed from project file are as follows. This extension uses node.js
jade module. 
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