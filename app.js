import dialogflow from '@google-cloud/dialogflow'
import express, { urlencoded } from 'express'
import {v4} from 'uuid'
import cors from 'cors'

  const type= "service_account"
  const project_id= "tiendazapatos-kipn"
  const private_key_id= "c9c256cb88be5873d7d192aadc2d106e84ee23e1"
  const private_key= "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC3NFdRP2ICPbIh\nd33FbRAusEZfOqoZtcxBDdyluZseQrMQuIIOozBVUTj3fO7qzWMtSHhzwXI5+ddx\nzsV54BSO2N8lHt6XHojoxYwz1kTvVt1UXy16S5AxQzLWQA9OvuRjxiDvcJsPfssj\nLK2/aK/lCFU44XGIRUN6sPLbLwtcupN/mXIp2E68vcAfnk866s0TZ7VZKW8CZQ8y\nR8hdTJiTLzPiTXqutJtpBN/sdFyCRCE45HZ9Imv8SFbfd//Jqz79ehL2TuoHMI7E\nYbgk//v64Rz8GKdTnXTiHC6VgEDDp1iZotMoZh2bHCaZgWr1ZmHKo/dqM59i9T+3\nkdIk4yV9AgMBAAECggEAVzgPc+pBfkCiC+XH1lRYdmnMbuzOa4QN9FCloa5t52eo\nuUamAFL3oT6UaNqtIdLbKwVL9wv7FhfYVmGyyRWBpAoinhkGrppGYs8dstYJJorL\nvy26yHSt9o3/51lDEGG3+LosFuIcqDFcg2fzZeNwjhC8BeLqeo5DFGemjuvkNGX8\na3lFEbJ53VJi8QhQzdCSiWl60SlxIdajRCjmCg2mtOrTDyHhgUUaXhnZTcl25qL0\nAl32R8sksffbKRy8XsukS1xgm6fn2kcDXP5gBsjFlUx7Xc6Pf5xo9vU8tPwCnLuo\n13t+TqMi2GrZbJmizzTZ+JTLz2TeG9WZ6iLYF7/2LwKBgQD7geDuS8IfmX58BgMw\nvOdMJaCvOaFePAamfr7x7dwev3tudMVTO2rXIHQt0iGlFSKAlNl7PabuuxwqKGfN\nFAQ32xXl+1WlA+u8XZDYfav5SAm+dtt+g/Nrx2UbRdBqKEinOMmwufCV+6szVHHN\nHyhM6fPmMlKp2ITA1Mx6McyS6wKBgQC6eh6IFc1km3G1Su+1ucWNkqYEdu/tEphX\n9vt69lk0UmZBM1nITdCm0l3J4Tn3/Iob1hCc6sl0B//tnFg0jSTv2TnXn56BfpEB\nDiBLMwYkYSj2Y3OKJUnHLJeYef+Nm/I0r5F6Vrfplf/wpx1ELImIguHHMw6N5dAK\ncVKGaed/NwKBgQCGCoJGfjnHfZbbopiwsPzUqHkq6hwGjRc+RO6fIZXfDU5LYBCK\ne3BFlxZUFVm5EbqBrNL7y6/cK/ymu0IXGkPlQO460+ihOaW5jmRT/SZahPoseEwi\n8VAacPqBvoOFEFMoTCux9Gc0iByGDstX9vMTitxiIw/LVYnq+36+4SuWYQKBgQCO\np82jnco7JQ+f+WvYQf33iDCpSbPSUV9qK+/G6Z7kgATp7DbLHXx5ooVNY5fNNs0Q\n7npXEOZ8dYI8bFauHSwcsLmnUt0Xg5O6kuvxm18fhZSoqPxCurPuQxbV9r6hvqNT\n2twYEy8u6ymZGL8y4D92x2mh0lVYCG9XDcpsOah3kQKBgQCVEWJ6hgCY83w+UXoj\n/W0mABpsKEC3jLxmxoqEKzEC2i7TVU+wCz9pgp+lbA0y5mf13xmkztl142eWcuGD\nxt+Ke3jMEqyRLrJea+ZBmMQxFk+mC6/yHV9P3X1plQKaPeIlcMrHaEFQZebTN1KO\nzRCMzZbg4lT7Vgw+ueAINKk+Ig==\n-----END PRIVATE KEY-----\n"
  const client_email= "proyectoihc@tiendazapatos-kipn.iam.gserviceaccount.com"
  const client_id= "113760517451940733665"
  const auth_uri= "https://accounts.google.com/o/oauth2/auth"
  const token_uri= "https://oauth2.googleapis.com/token"
  const auth_provider_x509_cert_url= "https://www.googleapis.com/oauth2/v1/certs"
  const client_x509_cert_url= "https://www.googleapis.com/robot/v1/metadata/x509/proyectoihc%40tiendazapatos-kipn.iam.gserviceaccount.com"
  const universe_domain= "googleapis.com"

const app = express();

const configuration = {
  credentials:{
    private_key,
    client_email
  }
}

const sessionClient = new dialogflow.SessionsClient(configuration);

const detectIntent = async(queryText, sessionId)=>{
  let sessionPath = sessionClient.projectAgentSessionPath(project_id ,sessionId);
  //query text 
  let request = {
    session: sessionPath,
    queryInput: {
      text:{
        text: queryText,
        languageCode: 'es'
      }
    }
  }
  const response = await sessionClient.detectIntent(request);
  console.log(response[0]);
  return response[0];
}

app.use(express.json());
app.use(cors({
  origin: "*",
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
}))

const port = 3000;

app.post('/dialogflow', async(req,res)=>{
  try {
    const text = req.body.queryText;
    const sessionId = v4();
    const response = await detectIntent(text,sessionId);
    return res.status(200).json(response);  
  } catch (error) {
    console.log(error);
    return res.status(400).json("Error")
  }
})

app.get('/dialogflow', (_,res)=>{
  res.json('hola mundo')
})


app.listen(port, ()=>{
  console.log(`server on port ${port}`)
})