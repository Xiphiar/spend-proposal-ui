import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import { useUser } from './Contexts/UserContext';
import Prop from './Prop';

function App() {
  const { user, connecting, connectWallet } = useUser()

  const handleClick = (e: any) => {
    connectWallet()
  }

  return (
    <Container>
      <Row className='mt-2'>
        <Col>
          <h1>Submit Spend Proposal</h1>
        </Col>
        <Col xs='auto'>
          <Button type='button' onClick={handleClick} disabled={connecting || !!user}>
            {user ?
              user.address
            :
              <>
                Connect Wallet
                { connecting && <Spinner /> }
              </>
            }
          </Button>
        </Col>
      </Row>

      {/* <Row className='justify-content-center mt-4'>
        <Col xs={10} md={8} xl={6}>
            <p>
              This tool demonstrates building human-readable transaction history using decrypted transactions queried from an RPC node.
            </p>
            <p className='mb-0'>
              The following transactions are supported by this demo:
            </p>
            <ul className='mt-1'>
              <li>Sending/Receiving Native Denoms</li>
              <li>Sending SNIP20 Tokens</li>
              <li>Shade Protocol Swaps</li>
            </ul>
        </Col>
      </Row> */}
      <hr className='mb-4' />

      {/* <TxTable /> */}
      <Prop />
    </Container>
  );
}

export default App;
