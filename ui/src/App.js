import { useEffect, useState } from 'react';
import { CONTACT_ABI, CONTACT_ADDRESS } from './ABI/Election.config';
import Web3 from 'web3';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from './components/TabPanel';
import './App.css'
import CandidatesPage from './components/pages/candidatesPage/CandidatesPage';
import AddCandidate from './components/pages/addCandidatePage/AddCandidatePage';
import ResultsPage from './components/pages/resultsPage/ResultsPage';

function App() {
  const [account, setAccount] = useState();
  const [electionContract, setElectionContract] = useState();
  const [candidates, setCandidates] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [timeToVote, setTimeToVote] = useState(0);
  const [electionStarts, setElectionStarts] = useState();
  const [electionEnds, setElectionEnds] = useState();
  const [isVoting, setIsVoting] = useState(false);
  const [votingEnabled, setVotingEnabled] = useState(true);

  
  useEffect(() => {
    async function load() {
      const web3 = new Web3(Web3.givenProvider || 'http://127.0.0.1:8545');
      const accounts = await web3.eth.requestAccounts();
      setAccount(accounts[0]);

      const contract = new web3.eth.Contract(CONTACT_ABI, CONTACT_ADDRESS);
      setElectionContract(contract);
      const counter = await contract.methods.candidatesCount().call();

      let allCandidates = []
      for (let i=1; i<= counter; i++) {
        const candidate = await contract.methods.candidates(i).call();
        allCandidates.push({
          id: candidate.id,
          name: candidate.name,
          description: candidate.description,
          voteCount: parseInt(candidate.voteCount),
          political_notion: parseInt(candidate.politicalNotion),
          economical_notion: parseInt(candidate.economicalNotion),
          social_notion: parseInt(candidate.socialNotion),
          religous_notion: parseInt(candidate.religousNotion),
          enviromnent_friendly: parseInt(candidate.envFriendly),
          years_of_experience: parseInt(candidate.yearsOfExperience),
          age: parseInt(candidate.age)
        })
      }
      setCandidates(allCandidates);

      const votingTime = await contract.methods.votingTime().call();
      setTimeToVote(parseInt(votingTime))

      let electionStartDate = await contract.methods.electionStarts().call();
      electionStartDate = new Date(parseInt(electionStartDate))
      setElectionStarts(electionStartDate)

      let electionEndDate = await contract.methods.electionEnds().call();
      electionEndDate = new Date(parseInt(electionEndDate))
      setElectionEnds(electionEndDate)
    }

    load();
   }, []);

   useEffect(() => {
    const interval = setInterval(() => {
      if (timeToVote > 0) {
        if (isVoting) {
          setTimeToVote(timeToVote - 1);
        }
      } else {
        setVotingEnabled(false);
        setIsVoting(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeToVote, isVoting]);
  
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  }

  const onVote = async (candidateId) => {
    try {
      const voteResult = await electionContract.methods.vote(candidateId).send({from: account});
      if (voteResult && voteResult.status) {
        setCandidates(candidates.map(candidate => {
          return {
            ...candidate,
            voteCount: candidate.id === candidateId ? candidate.voteCount + 1 : candidate.voteCount
          }
        }))
      }
    } catch (err) {
      console.error(err)
    }
  }

  const onAddCandidate = async ({candidateName}) => {
    try {
      const createResult = await electionContract.methods.addCandidate(candidateName).send({from: account});
      const eventRes = createResult.events.createdCandidateEvent.returnValues;
      setCandidates([
        ...candidates, 
        {
          id: eventRes.candidateId,
          name: candidateName,
          voteCount: 0
        }
      ])
      handleTabChange(0, 0)
    } catch (err) {
      console.error(err)
    }
  }

  const onCancelAddCandidate = async () => {
    handleTabChange(0, 0)
  }

  const changeVotingState = () => {
    setIsVoting(true);
    setVotingEnabled(false);
  }

  return (
    <div className='app'>
    <div className='header-container'>
      <AppBar position='static' className='app-bar-header'>
        <h1>Election Poll</h1>
        {
          (electionStarts && electionEnds) &&
          <h3>{electionStarts.toISOString().split('T')[0]} - {electionEnds.toISOString().split('T')[0]}</h3>
        }
        <Tabs value={selectedTab} onChange={handleTabChange} textColor="#ffffff" indicatorColor='#ffffff' centered>
          <Tab label="All Candidates"/>
          <Tab label="Add Candidate"/>
          <Tab label="Results"/>
        </Tabs>
      </AppBar>
    </div>
    <div className='body-container'>
      <TabPanel value={selectedTab} index={0}>
        <CandidatesPage 
          allCandidates={candidates}
          onVote={onVote}
          isVoting={isVoting}
          onChangeVotingState={changeVotingState}
          votingTime={timeToVote}
          votingEnabled={votingEnabled}
        />
      </TabPanel>
      <TabPanel value={selectedTab} index={1}>
        <AddCandidate 
          onSave={onAddCandidate}
          onCancel={onCancelAddCandidate}
        />
      </TabPanel>
      <TabPanel value={selectedTab} index={2}>
        <ResultsPage candidatesData={candidates}/>
      </TabPanel>
    </div>
    
    </div>
  );
}

export default App;