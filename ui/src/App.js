import { useEffect, useState } from 'react';
import { CONTACT_ABI, CONTACT_ADDRESS } from './ABI/Election.config';
import Web3 from 'web3';

function App() {
  const [account, setAccount] = useState();
  const [candidatesList, setCandidatesList] = useState();
  const [candidates, setCandidates] = useState([]);
  
  useEffect(() => {
    async function load() {
      const web3 = new Web3(Web3.givenProvider || 'http://127.0.0.1:8545');
      const accounts = await web3.eth.requestAccounts();
      setAccount(accounts[0]);

      const candidatesList = new web3.eth.Contract(CONTACT_ABI, CONTACT_ADDRESS);
      setCandidatesList(candidatesList);
      console.log(await candidatesList.methods.candidatesCount().call())
      const counter = await candidatesList.methods.candidatesCount().call();
      for (let i=1; i<= counter; i++) {
        const candidate = await candidatesList.methods.candidates(i).call();
        setCandidates((candidates) => [...candidates, candidate]);
      }
    }

    load();
   }, []);
  
   return (
     <div>
       Your account is: {account}
       <h1>Candidates</h1>
      <ul>
      {
        Object.keys(candidates).map((candidate, index) => (
          <li key={`${candidates[index].name}-${index}`}>
            <h4>{candidates[index].name}</h4>
            <span><b>Vote Count: </b>{candidates[index].voteCount}</span>
          </li>
        ))
      }
      </ul>
     </div>
   );
}

export default App;