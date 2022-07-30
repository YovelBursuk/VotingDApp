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
import { ERC20BASIC_CONTRACT_ABI } from './ABI/ERC20Basic.config';
import PickForMe from './components/pages/pickForMeModal/PickForMe';

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
  const [openPickForMe, setOpenPickForMe] = useState(false);

  
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
          voteCount: parseInt(candidate.voteCount)
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

      const erc20_address = await contract.methods.erc20().call();
      const erc20_contract = new web3.eth.Contract(ERC20BASIC_CONTRACT_ABI, erc20_address);
      const accountBalance = await erc20_contract.methods.balanceOf(accounts[0]).call();
      if (parseInt(accountBalance) > 0) {
        setIsVoting(false)
        setVotingEnabled(false)
        setTimeToVote(0)
      }
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
      setIsVoting(false)
      setVotingEnabled(false)
      setTimeToVote(0)
    } catch (err) {
      console.error(err)
    }
  }

  const onAddCandidate = async ({candidateName, candidateDescription}) => {
    try {
      const createResult = await electionContract.methods.addCandidate(candidateName, candidateDescription).send({from: account});
      const eventRes = createResult.events.createdCandidateEvent.returnValues;
      setCandidates([
        ...candidates, 
        {
          id: eventRes.candidateId,
          name: candidateName,
          voteCount: 0,
          description: candidateDescription
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
        <Tabs value={selectedTab} onChange={handleTabChange} textColor="#ffffff" indicatorColor='#ffffff' centered>
          <Tab label="All Candidates"/>
          <Tab label="Add Candidate"/>
          <Tab label="Results"/>
        </Tabs>
      </AppBar>
    </div>
    <div className='body-container'>
      <TabPanel value={selectedTab} index={0} className='candidate-page-tab'>
        <CandidatesPage 
          allCandidates={candidates}
          onVote={onVote}
          isVoting={isVoting}
          onChangeVotingState={changeVotingState}
          votingTime={timeToVote}
          votingEnabled={votingEnabled}
          electionStarts={electionStarts}
          electionEnds={electionEnds}
          openAutoPick={() => setOpenPickForMe(true)}
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
    
    <PickForMe 
      isOpen={openPickForMe}
      onClose={() => setOpenPickForMe(false)}
      onSave={(properties) => {
        console.log(properties);
        setOpenPickForMe(false);
      }}
    />
    </div>
  );
}

export default App;