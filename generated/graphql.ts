export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  tournaments: Array<Maybe<Tournament>>;
  tournament: Tournament;
};


export type QueryTournamentArgs = {
  id: Scalars['ID'];
};

export type Tournament = {
  __typename?: 'Tournament';
  id: Scalars['ID'];
  name: Scalars['String'];
  schools: Array<School>;
  teams: Array<Team>;
  team: Team;
  school: School;
  judges: Array<Maybe<Judge>>;
  judge: Judge;
  rounds: Array<Round>;
  round: Round;
  matchup: Matchup;
  ballot: Ballot;
  outstandingWitnesses: Array<IndividualAward>;
  outstandingCompetitors: Array<IndividualAward>;
};


export type TournamentTeamArgs = {
  num: Scalars['Int'];
};


export type TournamentSchoolArgs = {
  name: Scalars['String'];
};


export type TournamentJudgeArgs = {
  id: Scalars['ID'];
};


export type TournamentRoundArgs = {
  num: Scalars['Int'];
};


export type TournamentMatchupArgs = {
  id: Scalars['ID'];
};


export type TournamentBallotArgs = {
  id: Scalars['ID'];
};


export type TournamentOutstandingCompetitorsArgs = {
  role: Role;
};

export type School = {
  __typename?: 'School';
  tournamentId?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  teams?: Maybe<Array<Maybe<Team>>>;
};

export type Team = {
  __typename?: 'Team';
  name: Scalars['String'];
  num: Scalars['Int'];
  schoolName: Scalars['String'];
  school: School;
  tournamentId: Scalars['ID'];
  students: Array<Maybe<Student>>;
  matchups: Array<Maybe<Matchup>>;
  wins: Scalars['Int'];
  losses: Scalars['Int'];
  ties: Scalars['Int'];
};

export type Student = {
  __typename?: 'Student';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Matchup = {
  __typename?: 'Matchup';
  id: Scalars['ID'];
  pl: MatchupTeam;
  def: MatchupTeam;
  roundNum: Scalars['Int'];
  team: MatchupTeam;
  ballots?: Maybe<Array<Maybe<Ballot>>>;
  notes?: Maybe<Scalars['String']>;
};


export type MatchupTeamArgs = {
  side: Side;
};

export type MatchupTeam = {
  __typename?: 'MatchupTeam';
  tournamentId: Scalars['ID'];
  matchupId: Scalars['ID'];
  teamNum: Scalars['Int'];
  side: Side;
  team: Team;
  studentInRole?: Maybe<Student>;
  witness: MatchupWitness;
  attorney?: Maybe<MatchupAttorney>;
};


export type MatchupTeamStudentInRoleArgs = {
  role: AttorneyRole;
};


export type MatchupTeamWitnessArgs = {
  order?: Maybe<Scalars['Int']>;
};


export type MatchupTeamAttorneyArgs = {
  order?: Maybe<Scalars['Int']>;
  role?: Maybe<AttorneyRole>;
  crossingWitnessNum?: Maybe<Scalars['Int']>;
};

export enum Side {
  Pl = 'PL',
  Def = 'DEF'
}

export enum AttorneyRole {
  Opener = 'OPENER',
  Middle = 'MIDDLE',
  Closer = 'CLOSER'
}

export type MatchupWitness = {
  __typename?: 'MatchupWitness';
  matchupTeam: MatchupTeam;
  order?: Maybe<Scalars['Int']>;
  student?: Maybe<Student>;
  studentId: Scalars['ID'];
  witnessName?: Maybe<Scalars['String']>;
};

export type MatchupAttorney = {
  __typename?: 'MatchupAttorney';
  student?: Maybe<Student>;
};

export type Ballot = {
  __typename?: 'Ballot';
  id: Scalars['ID'];
  matchup: Matchup;
  judge: Judge;
  side: BallotSide;
  pd?: Maybe<Scalars['Int']>;
  witnessAwards: Array<Maybe<MatchupWitness>>;
  attorneyAwards: Array<Maybe<MatchupAttorney>>;
  complete: Scalars['Boolean'];
};


export type BallotSideArgs = {
  side: Side;
};


export type BallotPdArgs = {
  side: Side;
};

export type Judge = {
  __typename?: 'Judge';
  id: Scalars['ID'];
  name: Scalars['String'];
  tournamentId: Scalars['ID'];
  ballots: Array<Maybe<Ballot>>;
  conflicts: Array<Maybe<School>>;
  email?: Maybe<Scalars['String']>;
};

export type BallotSide = {
  __typename?: 'BallotSide';
  side: Side;
  speech?: Maybe<Scalars['Int']>;
  speechNotes?: Maybe<Scalars['String']>;
  exam?: Maybe<Scalars['Int']>;
  examNotes?: Maybe<Scalars['String']>;
  sum: Scalars['Int'];
};


export type BallotSideSpeechArgs = {
  speech: Speech;
};


export type BallotSideSpeechNotesArgs = {
  speech: Speech;
};


export type BallotSideExamArgs = {
  order: Scalars['Int'];
  role: Role;
  type: ExamType;
};


export type BallotSideExamNotesArgs = {
  order: Scalars['Int'];
  role: Role;
  type: ExamType;
};

export enum Speech {
  Opening = 'OPENING',
  Closing = 'CLOSING'
}

export enum Role {
  Witness = 'WITNESS',
  Attorney = 'ATTORNEY'
}

export enum ExamType {
  Direct = 'DIRECT',
  Cross = 'CROSS'
}

export type Round = {
  __typename?: 'Round';
  tournamentId: Scalars['ID'];
  roundNum: Scalars['Int'];
  matchups: Array<Maybe<Matchup>>;
};

export type IndividualAward = {
  __typename?: 'IndividualAward';
  side: Side;
  ranks: Scalars['Int'];
  role: Role;
  student: Student;
};

export type Mutation = {
  __typename?: 'Mutation';
  addTournament?: Maybe<Tournament>;
  addSchool: School;
  addTeam?: Maybe<Team>;
  addStudentToTeam?: Maybe<AddStudentToTeam>;
  assignStudentToRole?: Maybe<AssignStudentToRole>;
  addManualRound: Round;
  assignMatchupNotes: AssignMatchupNotes;
  addJudge: Judge;
  addJudgeConflict: Judge;
  assignJudgeEmail: Judge;
  assignJudgeToMatchup: Ballot;
  assignWitnessOrder: AssignWitnessOrder;
  assignAttorneyToDirect: AssignAttorneyToDirect;
  assignCrossOrder: AssignCrossOrder;
  assignWitnessName: AssignWitnessName;
  assignSpeechScore: Scalars['Int'];
  assignSpeechNotes: Scalars['String'];
  assignExamScore: Scalars['Int'];
  assignExamNotes: Scalars['String'];
  assignIndividualAward: AssignIndividualAward;
  completeBallot: Ballot;
  deleteBallot: Scalars['Boolean'];
};


export type MutationAddTournamentArgs = {
  name: Scalars['String'];
};


export type MutationAddSchoolArgs = {
  name: Scalars['String'];
  tournament: Scalars['ID'];
};


export type MutationAddTeamArgs = {
  name: Scalars['String'];
  num: Scalars['Int'];
  school: Scalars['String'];
  tournament: Scalars['ID'];
};


export type MutationAddStudentToTeamArgs = {
  name: Scalars['String'];
  team: Scalars['Int'];
  tournamentId: Scalars['ID'];
};


export type MutationAssignStudentToRoleArgs = {
  matchup: Scalars['ID'];
  role: AttorneyRole;
  student: Scalars['ID'];
  team: Scalars['Int'];
  tournamentId: Scalars['ID'];
};


export type MutationAddManualRoundArgs = {
  matchups: Array<Maybe<ManualRoundMatchup>>;
  tournamentId: Scalars['ID'];
};


export type MutationAssignMatchupNotesArgs = {
  matchup: Scalars['ID'];
  notes: Scalars['String'];
  tournament: Scalars['ID'];
};


export type MutationAddJudgeArgs = {
  name: Scalars['String'];
  tournamentId: Scalars['ID'];
};


export type MutationAddJudgeConflictArgs = {
  judgeId: Scalars['ID'];
  school: Scalars['String'];
  tournamentId: Scalars['ID'];
};


export type MutationAssignJudgeEmailArgs = {
  email: Scalars['String'];
  judge: Scalars['ID'];
  tournament: Scalars['ID'];
};


export type MutationAssignJudgeToMatchupArgs = {
  judge: Scalars['ID'];
  matchup: Scalars['ID'];
  tournament: Scalars['ID'];
};


export type MutationAssignWitnessOrderArgs = {
  matchup: Scalars['ID'];
  order: Scalars['Int'];
  side: Side;
  student: Scalars['ID'];
  tournament: Scalars['ID'];
};


export type MutationAssignAttorneyToDirectArgs = {
  matchup: Scalars['ID'];
  order: Scalars['Int'];
  side: Side;
  student: Scalars['ID'];
  tournament: Scalars['ID'];
};


export type MutationAssignCrossOrderArgs = {
  matchup: Scalars['ID'];
  order: Scalars['Int'];
  side: Side;
  student: Scalars['ID'];
  tournament: Scalars['ID'];
};


export type MutationAssignWitnessNameArgs = {
  matchup: Scalars['ID'];
  order: Scalars['Int'];
  side: Side;
  tournament: Scalars['ID'];
  witness: Scalars['String'];
};


export type MutationAssignSpeechScoreArgs = {
  ballot: Scalars['ID'];
  score: Scalars['Int'];
  side: Side;
  speech: Speech;
};


export type MutationAssignSpeechNotesArgs = {
  ballot: Scalars['ID'];
  notes: Scalars['String'];
  side: Side;
  speech: Speech;
};


export type MutationAssignExamScoreArgs = {
  ballot: Scalars['ID'];
  cross: Scalars['Boolean'];
  exam: Scalars['Int'];
  score: Scalars['Int'];
  side: Side;
  witness: Scalars['Boolean'];
};


export type MutationAssignExamNotesArgs = {
  ballot: Scalars['ID'];
  cross: Scalars['Boolean'];
  exam: Scalars['Int'];
  notes: Scalars['String'];
  side: Side;
  witness: Scalars['Boolean'];
};


export type MutationAssignIndividualAwardArgs = {
  ballot: Scalars['ID'];
  rank: Scalars['Int'];
  role: Role;
  student: Scalars['ID'];
};


export type MutationCompleteBallotArgs = {
  ballot: Scalars['ID'];
  tournament: Scalars['ID'];
};


export type MutationDeleteBallotArgs = {
  id: Scalars['ID'];
};

export type AddStudentToTeam = {
  __typename?: 'AddStudentToTeam';
  team: Team;
  student: Student;
};

export type AssignStudentToRole = {
  __typename?: 'AssignStudentToRole';
  matchup: Matchup;
  student: Student;
  role: AttorneyRole;
};

export type ManualRoundMatchup = {
  pl: Scalars['Int'];
  def: Scalars['Int'];
};

export type AssignMatchupNotes = {
  __typename?: 'AssignMatchupNotes';
  matchup: Matchup;
  notes: Scalars['String'];
};

export type AssignWitnessOrder = {
  __typename?: 'AssignWitnessOrder';
  matchup: Matchup;
  student: Student;
  order: Scalars['Int'];
};

export type AssignAttorneyToDirect = {
  __typename?: 'AssignAttorneyToDirect';
  matchup: Matchup;
  student: Student;
  order: Scalars['Int'];
};

export type AssignCrossOrder = {
  __typename?: 'AssignCrossOrder';
  matchup: Matchup;
  team: Team;
  student: Student;
  order: Scalars['Int'];
};

export type AssignWitnessName = {
  __typename?: 'AssignWitnessName';
  matchup: Matchup;
  witnessName: Scalars['String'];
};

export type AssignIndividualAward = {
  __typename?: 'AssignIndividualAward';
  rank: Scalars['Int'];
  role: IndividualAwardRole;
};

export type IndividualAwardRole = MatchupAttorney | MatchupWitness;
