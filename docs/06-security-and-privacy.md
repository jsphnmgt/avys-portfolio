# Security and privacy checklist

Work through this **before your first push**, and again before you submit. It is
short, none of it is exotic, and a grader can check most of it in two minutes.

Your repository is public, in your own account, and permanent. That is the point
of it, and it is also why this file exists.

## Before the first push

- [X] `.gitignore` includes `.env`, and `git check-ignore -v .env` confirms it
- [X] `git ls-files | grep -iE '\.env$|\.pem$|id_rsa'` prints nothing
- [N/A] `.env.example` is committed, with **placeholder** values only
- [X] No connection string, key or password anywhere in the repository,
      including in a screenshot
- [X] No `student.json`, and no name, student number or email of yours or anyone
      else's

## The application

- [N/A] Every SQL query is parameterised. Values go in the array, never into the
      string. This is one line of defence you already know how to do
- [N/A] Input is validated **on the server**, not only in React. Length limits on
      every text field
- [N/A] `cors({ origin: allowedOrigins })` names your origins. Not `cors()` with no
      options, which allows every site on the internet
- [N/A] `NODE_ENV=production` on the host, and no stack trace in any response body
- [N/A] `helmet` installed, which is one line for several real protections
- [N/A] Anything that costs money or accepts a password is rate limited
- [N/A] Passwords, if you have accounts, are hashed with bcrypt and never logged
- [N/A] Every route that touches somebody's data has the ownership check **in the
      query**, as `AND user_id = $2`, not as an `if` above it
- [X] `npm audit` run once, and the easy fixes taken

```bash
npm install helmet
```

```js
import helmet from 'helmet'
app.use(helmet())
```

## Privacy

The half that matters more, because it is about other people.

- [X] **No real classmates' names, numbers, emails or photos**, anywhere. Not in
      seed data, not in screenshots, not in the demo video. Consent for a course
      project does not cover the next ten years of a public repository
- [N/A] Seed data is invented. Yours will be read
- [N/A] If real people tested your app, even three friends, their data is deleted
      before you submit
- [N/A] If your app collects anything about anyone, the app says what it collects
- [No] Any face in a screenshot is stock, generated, or yours
      - artist photos are third-party images. Their sources and credits need documenting, and permission to use them has not been confirmed.

## Reflection

The main risk is using third-party artwork, covers, and photos without fully documented permissions. I have acknowledged third-party ownership, but individual credits and permission records remain incomplete. I need to verify their licenses, obtain permission where necessary, or replace assets I cannot establish permission to use. My name and contact links are intentionally public, and the website has no visitor submission forms or account database.