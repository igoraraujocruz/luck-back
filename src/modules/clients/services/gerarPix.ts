import 'dotenv/config'
import axios from 'axios';
import fs from 'fs'
import path from 'path'
import https from 'https'

const GN_CLIENT_ID = process.env.NODE_ENV === 'dev' ? process.env.GN_CLIENT_ID_HOMOLOG : process.env.GN_CLIENT_ID_PRODUCTION;
const GN_CLIENT_SECRET = process.env.NODE_ENV === 'dev' ? process.env.GN_CLIENT_SECRET_HOMOLOG : process.env.GN_CLIENT_SECRET_PRODUCTION;
const GN_ENDPOINT = process.env.NODE_ENV === 'dev' ? process.env.GN_ENDPOINT_HOMOLOG : process.env.GN_ENDPOINT_PRODUCTION;
const GN_CERT = process.env.NODE_ENV === 'dev' ? process.env.GN_CERT_HOMOLOG : process.env.GN_CERT_PRODUCTION;

const cert = fs.readFileSync(
    path.resolve(__dirname, `../certs/${GN_CERT}`)
  )
  
  const agent = new https.Agent({
    pfx: cert,
    passphrase: ''
  })

  const credentials = Buffer.from(
    `${GN_CLIENT_ID}:${GN_CLIENT_SECRET}`
  ).toString('base64');

  const authenticate = () => (
    axios({
      method: 'POST',
      url: `${GN_ENDPOINT}/oauth/token`,
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/json'
      },
      httpsAgent: agent,
      data: {
        grant_type: 'client_credentials'
      }
    })
  ) 



  export const gerarPix = async (totalPrice: number, clientId: string, rifas: any) => {

    const authResponse = await authenticate()
    const { access_token } = authResponse.data; 
    
    const reqGN = axios.create({
        baseURL: GN_ENDPOINT,
        httpsAgent: agent,
        headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json'
        },
    });
    
    const dataCob = {   
        calendario: {
            expiracao: Number(process.env.GN_TEMPO_DE_VALIDADE_PIX_EM_SEGUNDOS)
        },
        valor: {
            original: totalPrice.toFixed(2).toString()
        },
        chave: process.env.GN_CHAVE_PIX,
        solicitacaoPagador: `${clientId+'r:'+rifas}`
    }

    const cobranca = await reqGN.post('/v2/cob', dataCob)

    const qrcode = await reqGN.get(`/v2/loc/${cobranca.data.loc.id}/qrcode`)
    
    return { qrcode, cobranca }
  }
  