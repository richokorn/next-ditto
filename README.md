# Ditto

_Write beautiful stories_

## Getting Started

- Fork the project and create a `.env` file in the root directory.
- Populate it with the following entries to run it on `localhost:3000`:
  - PGHOST=localhost
  - PGPORT=5432
  - PGDATABASE=(...)
  - PGUSERNAME=(...)
  - PGPASSWORD=(...)
- Replace "(...)" with a value of your choice.
- Open the project in VSCode and fire up a terminal...
- Run `yarn` to download dependancies, install postgres with `yarn add postgres`
- Start postgres with `postgres` and migrate necessary databases with `yarn ley up`
- Finally, run the development server with `yarn dev`
- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

<hr>

## But what is Ditto?

Ditto is a minimal, easy-on-the-eyes writer app that shows you which words you are repeating a bit too often.
Design inspired by [CalmlyWriter Online](https://www.calmlywriter.com/online/), it implements [Slate](https://www.slatejs.org/) as its Editor.
A RESTful API handles communication between Frontend and a PostgreSQL Database.

## What Can It Do?

- You can type and edit stories of your choice!
- A smooth yet minimalistic UI keeps you focused on the work
- Some keyboard shortcuts exist:
  - `Ctrl-1` - Toggle a H1 heading.
  - `` Ctrl-` `` - Toggle a code-block. (You might **additionally** need `Shift` on european keyboards)
  - `Ctrl-b` - Selected text becomes bold.
  - `Ctrl-i` - Selected text becomes italic.

## Upcoming Features:

- Thesaurus to suggest alternate words to write, as you write.
- More _What You See Is What You Get_ markdown realtime functionality, such as typing "##" to change to a `h2` heading.
- Further formatting options.
