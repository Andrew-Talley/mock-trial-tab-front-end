import React from "react";
import Head from "next/head";
import { Button } from "reactstrap";
import Link from "next/link";

export default function Home() {
  return (
    <React.Fragment>
      <Head>
        <title>Mock Trial Tab</title>
      </Head>
      <h1 className="text-center">Mock Trial Tab</h1>
      <Link href="/tournament/new">
        <Button color="primary" tag="a">
          Make a New Tournament
        </Button>
      </Link>
      <h2 className="mt-4">About Mock Trial Tab</h2>
      <p>
        For the last three years, I've wanted to make automated mock trial tab
        software. Tabulation is all about doing an algorithm. In general, the
        process is: sort teams, line then up, then procedurally apply swaps.
        These are all things computers are very, very good at. There are{" "}
        <a href="https://podcasts.apple.com/us/podcast/the-mock-review-with-ben-and-drew/id1399830743?i=1000472826003">
          good reasons not to use it
        </a>
        , at least for AMTA tournaments (Regionals, ORCS, etc.), but I think an
        online option will end up being the best option for invitationals, even
        if this isn't it.
      </p>
      <p>
        Then... COVID happened. And then AMTA said we'll have virtual mock
        trial. Now, having this is more useful than ever. So, I decided to make
        something to handle everything tab-related on a website. My hope is that
        this will be a useful product at least a handful of tournaments. My
        program will be using this for our invitational. But, this should
        continue to be usable even after COVID to help make hosting
        invitationals easier for people without someone who has read the entire
        tabulation manual.
      </p>
      <h2>What we have now</h2>
      <p>We have a number of features in place right now:</p>
      <ul>
        <li>Ability to add schools and teams</li>
        <li>Ability to add judges</li>
        <li>Ability to manually add pairings for a given round</li>
        <li>Ability to manually assign judges to ballots</li>
        <li>Ability to share ballots via url</li>
        <li>Ability to fill out ballots (both score and notes)</li>
        <li>
          A lot of rusty edges! If there's an error, it probably won't tell you
          (though it'll be obvious that it didn't work). If you change something
          in one place, you may need to reload the page before it shows up
          somewhere else. And if you try, you can absolutely break things
          (assign a judge multiple ballots in the same round, etc.). All of this
          will be fixed, but be forewarned you need to be a bit gentle with this
          in its current iteration.
        </li>
      </ul>
      <p>
        For the most part, we have a very bare bones setup. For now, I'd love
        for teams to use this for scrimmages. I've made it completely open for
        anyone to make a tournament. Please – make a tournament for a scrimmage,
        add your school, add your teams, add some judges, and use it to store
        all the data. Your feedback will be extremely helpful going forward.
      </p>
      <h2>What's Coming Up</h2>
      <p>
        Here is my optimistic timeline. I think it's doable, but I wouldn't rely
        on it if I were you.
      </p>
      <h3>Done by next week (9/26):</h3>
      <ul>
        <li>
          Ability to edit the lineups for each side (e.g., witness calls,
          attorneys, speakers, etc.)
        </li>
        <li>
          Ability to add/edit information for tournaments/rounds/matchups (e.g.,
          Zoom links)
        </li>
      </ul>
      <h3>Done in two weeks (10/03):</h3>
      <ul>
        <li>Ability to add judge conflicts</li>
        <li>Ability to automatically pair rounds per AMTA rules</li>
        <li>Individual awards</li>
        <li className="font-italic">
          Note: At this point, it should be possible to use this website to host
          a tournament. You will need to be careful to only send links to
          ballots to judges, since there won't be a way to prevent anyone with
          the URL from modifying a ballot.
        </li>
      </ul>
      <h3>Done in three weeks (10/10):</h3>
      <ul>
        <li>
          Judge Authentication – Send a link to judges to sign up so that ballot
          information is not publicly editable
        </li>
      </ul>
      <h3>Done in a month (10/17):</h3>
      <ul>
        <li>Authentication for everyone else</li>
      </ul>
      <h3>Done later down the line... maybe</h3>
      <ul>
        <li>Registration</li>
        <li>
          Zoom integration – Assign "bailiffs", let them link their Zoom
          account, and then Zoom links will automatically be generated for
          rounds
        </li>
      </ul>
      <p>
        I will note – a lot of this stuff is largely done (e.g., the algorithms
        for doing pairings are already there, I just need to connect it to the
        API interface and front-end). So these deadlines aren't as insane as
        they may seem.
      </p>
      <h2>Tournament Hosts</h2>
      <p>
        If you're a tournament host and interested in using this for it – please
        feel free to email me at{" "}
        <a href="mailto:andrewdtalley@gmail.com">andrewdtalley@gmail.com</a>. I
        want to know how many people are interested, what you're considering,
        etc. Unfortunately – hosting this isn't free. I may end up charging a
        nominal fee (probably less than 1/6 of the registration fee for a single
        team) just to help support hosting costs. But I have no idea what the
        hosting will cost yet.
      </p>
      <h2>People interested in helping</h2>
      <p>If you're interested in helping, there are a few things you can do:</p>
      <ul>
        <li>
          Developers: Help develop it on{" "}
          <a href="https://github.com/Andrew-Talley/mock-trial-tab">GitHub</a>.
        </li>
        <li>
          Test it – go through a tournament, try to take a series of actions,
          see if anything doesn't work. If you do run into an issue, figure out
          what you need to do to recreate it and tell me on{" "}
          <a href="/">GitHub</a>.
        </li>
        <li>
          <a href="mailto:andrewdtalley@gmail.com">Send me feedback</a> about
          features you'd want to see, or any other useful feedback.
        </li>
      </ul>
    </React.Fragment>
  );
}
