import { Row, Col, Spinner, Button } from "react-bootstrap";
import { useUser } from "./Contexts/UserContext";
import { useState } from "react";
import { toast } from "react-toastify";
import { Coin, ProposalType } from "secretjs";
import { CommunityPoolSpendProposal } from "secretjs/dist/protobuf/cosmos/distribution/v1beta1/distribution";
import { humanToDenom } from "./Utils/denoms";

const maxDeposit = process.env.REACT_APP_CHAIN_ID.includes('archway') ? 5000 : 1;

const Prop = () => {
  const { user, connectWallet } = useUser();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [deposit, setDeposit] = useState('');

  const changeAmount = (e: any) => {
    setAmount(e.target.value.replace(/[^0-9\\.]+/g, ''))
  }

  const changeInitialDeposit = (e: any) => {
    const filtered = e.target.value.replace(/[^0-9\\.]+/g, '')
    if (!filtered) {
      setDeposit(filtered);
      return;
    }

    const float = parseFloat(filtered)
    if (float > maxDeposit) setDeposit(maxDeposit.toString())
    else setDeposit(float.toString())
  }

  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (!user) await connectWallet();
      if (!user) throw 'Still no user!'

      const denomAmount = humanToDenom(amount, 18)
      console.log('Denom Amount:', denomAmount);

      const propContent: CommunityPoolSpendProposal = {
        title,
        description,
        recipient,
        amount: [{amount: denomAmount.toString(), denom: process.env.REACT_APP_COIN_DENOM}]
      }

      const depositAmount = humanToDenom(deposit, 18)
      console.log('Deposit Denom Amount:', depositAmount);

      console.log('Simulating')
      const simResponse = await user.client.tx.gov.submitProposal.simulate({
        proposer: user.address,
        type: ProposalType.CommunityPoolSpendProposal,
        content: propContent,
        initial_deposit: [{amount: depositAmount.toString(), denom: process.env.REACT_APP_COIN_DENOM}]
      },{
        feeDenom: process.env.REACT_APP_COIN_DENOM
      })

      console.log('Submitting', simResponse.gas_info?.gas_used)
      const response = await user.client.tx.gov.submitProposal({
        proposer: user.address,
        type: ProposalType.CommunityPoolSpendProposal,
        content: propContent,
        initial_deposit: [{amount: depositAmount.toString(), denom: process.env.REACT_APP_COIN_DENOM}]
      },
      {
        gasLimit: parseInt(simResponse.gas_info?.gas_used || '200_000') * 1.04
      })

      if (response.code) throw response.rawLog;
      console.log(response);
      toast.success('Proposal TX Suceeded!')

    } catch (err: any) {
      console.error(err)
      if (typeof err === 'object')
        toast.error(JSON.stringify(err))
      else toast.error(err.toString())
    } finally {
      setLoading(false);
    }
  }

  if (!user) return (
    <Row className='justify-content-center'>
      <Col xs='auto'>
        <h2>Connect wallet to submit proposal.</h2>
      </Col>
    </Row>
  )

  if (loading) return (
    <Row className='justify-content-center'>
      <Col xs='auto'>
        <Spinner />
      </Col>
    </Row>
  )

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Row className='mb-2'>
          <label className='d-flex flex-column'>
            Title
            <input value={title} onChange={e=>setTitle(e.target.value)} />
          </label>
        </Row>
        <Row className='mb-2'>
          <label className='d-flex flex-column'>
            Description
            <textarea value={description} onChange={e=>setDescription(e.target.value)} />
          </label>
        </Row>
        <Row className='mb-2'>
          <label className='d-flex flex-column'>
            Spend Amount
            <Col style={{width: '256px'}} className="input-container">
              <input className='wide' type='text' value={amount} onChange={changeAmount} />
            </Col>
          </label>
        </Row>
        <Row>
          <label className='d-flex flex-column'>
            Recipient
              <input value={recipient} onChange={e=>setRecipient(e.target.value)} />
              <button type='button' className='textButton' style={{width: 'fit-content', alignSelf: 'end', fontSize: '12px', color: '#333333'}} onClick={()=>setRecipient(user.address || '')}>Use my address</button>
          </label>
        </Row>
        <Row className='mb-4'>
          <label className='d-flex flex-column'>
            <span>Initial Deposit (max {maxDeposit} ARCH)</span>
            <Col style={{width: '256px'}} className="input-container">
              <input className='wide' type='text' value={deposit} onChange={changeInitialDeposit} />
            </Col>
          </label>
        </Row>
        <Row className='justify-content-end'>
          <Col xs='auto'>
            <Button type="button" onClick={handleSubmit} disabled={loading}>Submit</Button>
          </Col>
        </Row>
      </form>
    </>
  )
}

export default Prop;