import axios from 'axios';
import { Request, Response } from 'express';
import Account from '../../../schemas/Chat'
import Messages from '../../../schemas/Messages'
import { io } from '../../../shared/http';


export class Controller {
    async getChat(request: Request, response: Response): Promise<Response> {
        const account = await Account.find()

        return response.json(account)
    }

    async teste(request: Request, response: Response): Promise<Response> {

        const { name, plataform, numberPhone, message } = request.body;

        const numberPhoneFormated = numberPhone.replace('(', '').replace(')', '').replace(' ', '').replace('-', '')

        const findAccount = await Account.findOne({
            numberPhone: numberPhoneFormated
        })

        if (!findAccount) {
            const account = await Account.create({
                name,
                numberPhone:numberPhoneFormated,
                plataform,
            })

            await Messages.create({
                accountId: account._id,
                message
            })
    
        }

        const chat = await Messages.create({
            accountId: findAccount?._id,
            message
        })

        return response.json(chat)
    }

    async createAccount(request: Request, response: Response): Promise<Response> {

        const { numberPhone } = request.body;

        if(numberPhone) {

            const findAccount = await Account.findOne({
                numberPhone
            })

            if(findAccount) {
                await Messages.create({
                    accountId:findAccount._id,
                    message: request.body.message,
                    isClient: false,
                })

                axios({
                    method: "POST",
                    url:
                        "https://graph.facebook.com/v15.0/" +
                        114324004871873 +
                        "/messages?access_token=" +
                        process.env.WHATSAPP_TOKEN,
                    data: {
                        messaging_product: "whatsapp",
                        to: findAccount.numberPhone,
                        text: { body: request.body.message },
                    },
                    headers: { "Content-Type": "application/json" },
                });

                io.emit("newMessage")
            }

        }
        
        if (request.body.object) {
            if (
                request.body.entry &&
                request.body.entry[0].changes &&
                request.body.entry[0].changes[0] &&
                request.body.entry[0].changes[0].value.messages &&
                request.body.entry[0].changes[0].value.messages[0]
            ) {
              const from = request.body.entry[0].changes[0].value.messages[0].from;
              const msg_body = request.body.entry[0].changes[0].value.messages[0].text.body;
              const clientName = request.body.entry[0].changes[0].value.contacts[0].profile.name;

              console.log('chegou aqui 1')
              console.log(from)
              console.log(msg_body)
              console.log(clientName)

              try {
                const findAccount = await Account.findOne({
                    numberPhone: from
                })

                if (!findAccount) {
                    const account = await Account.create({
                        name: clientName,
                        numberPhone: from,
                        plataform: 'Whatsapp',
                    })
        
                    await Messages.create({
                        accountId: account._id,
                        message: msg_body,
                        isClient: true,
                    })
    
                    console.log(account)
            
                }

                const chat = await Messages.create({
                    accountId: findAccount?._id,
                    message: msg_body,
                    isClient: true,
                })

                io.emit("newMessage")

                return response.json(chat)
                
              } catch(err) {
                console.log(err)
              }
            }
            response.sendStatus(200);
          } 
          return response.sendStatus(200)
    }

    async getChatByAccount(request: Request, response: Response): Promise<Response> {

        const { account } = request.query;

        const messages = await Messages.find({
            accountId: account
        })

        return response.json(messages)
    }

    async instagramWebHook(request: Request, response: Response) {

        const body = request.body;

        if (body.object === "instagram") {

            const recipient = body.entry[0].messaging[0].recipient.id

            const message = body.entry[0].messaging[0].message.text

            const findAccount = await Account.findOne({
                numberPhone: recipient
            })

            if (!findAccount) {
                const account = await Account.create({
                    id: recipient,
                    name: 'teste instagram' + recipient,
                    numberPhone: recipient,
                    plataform: 'Instagram',
                })
    
                await Messages.create({
                    accountId: account.numberPhone,
                    message: message,
                    isClient: true,
                })
        
            }

            const chat = await Messages.create({
                accountId: findAccount?.numberPhone,
                message: message,
                isClient: true,
            })

            console.log(chat)

            io.emit("newMessage")
            return response.json(chat)

        }

        if (body.object === "page") {

            response.status(200).send("EVENT_RECEIVED");

          } else {

            response.sendStatus(404);
          }
    }

    async verifyWebHook(request: Request, response: Response) {

        let mode = request.query["hub.mode"];
        let token = request.query["hub.verify_token"];
        let challenge = request.query["hub.challenge"];

        if (mode && token) {

            if (mode === "subscribe" && token === process.env.VERIFY_TOKEN) {
   
            console.log("WEBHOOK_VERIFIED");
            response.status(200).send(challenge);
            } else {

            response.sendStatus(403);
            }
        }
    }
}