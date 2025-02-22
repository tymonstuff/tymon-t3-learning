# Perudo App

## Admin

- [ ] Create a UI skeleton of the admin dashboard
  - [ ] Create a new game dialog
    - [ ] Generate a tournament code
    - [x] Input number of rounds
    - [x] Input number of tables
  - [ ] View players that joined tournament
  - [ ] Open & Close tournament (can or can't join)
  - [ ] Start round, next round.

### Notes on Admin

- No need to set how many players per table, we rely on the number of players joining a table instead as a count.
- Perhaps we should have a max players per table though?

### Backlog

- Ensure that two tournaments can't have the same code

## Player

- [ ] Join a tournament

## Todo

- [x] Deploy
- [x] Scafford UI with mock data
- [x] Tidy build up
- [x] Actual DB with Vercel
- [x] Attach database to UI
- [ ] Add Auth
- [ ] Add image upload
- [ ] Add "taint" (server)
- [ ] Use Next/Image component
- [ ] Error management
- [ ] Routing/image page (parallel routing)
- [ ] Server Actions "Delete"
- [ ] Analytics (posthog)
- [ ] Ratelimiting (upstash)
