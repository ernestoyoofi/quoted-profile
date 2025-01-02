# Quoted Profile

Gives your github readme profile a nice quoted look

> If you want to randomize each time, please deploy it yourself so that it can be randomized, and delete Cache-Control so that no cache is stored in the browser and can be randomized.

# How to use

- Replace the username section with your GitHub username.
- Create a quoted.txt file in the {yourusername}/{yourusername} repository.
- Place the file in the root of the repository at ~/quoted.txt.
- You can add multiple quotes with empty text in between to generate random quotes.

Burn API

```
https://quoted-profile.nakikoneko.workers.dev/[username]
```

Example:

![Quoted](https://quoted-profile.nakikoneko.workers.dev/ernestoyoofi)


### Change the background to transparent

Just add the istransparant=1 parameter to make the white color on the bg disappear

```txt
https://quoted-profile.nakikoneko.workers.dev/ernestoyoofi?istransparant=1
```

![Default](https://quoted-profile.nakikoneko.workers.dev/ernestoyoofi) > ![Transparant](https://quoted-profile.nakikoneko.workers.dev/ernestoyoofi?istransparant=1)

### Change the font

Just add the font=[Font name] parameter available on google fonts

```txt
https://quoted-profile.nakikoneko.workers.dev/ernestoyoofi?font=Space%20Mono
```

![Default](https://quoted-profile.nakikoneko.workers.dev/ernestoyoofi) > ![Space Mono Font](https://quoted-profile.nakikoneko.workers.dev/ernestoyoofi?font=Space%20Mono)

### Change dark text color to white

Just add the parameter iswhitetext=1 so that the black color becomes white color

```txt
https://quoted-profile.nakikoneko.workers.dev/ernestoyoofi?iswhitetext=1
```
![Default](https://quoted-profile.nakikoneko.workers.dev/ernestoyoofi) > ![White Text](https://quoted-profile.nakikoneko.workers.dev/ernestoyoofi?iswhitetext=1)
