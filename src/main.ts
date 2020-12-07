import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import { createServer, Response, Request } from "miragejs"

declare global {
  interface Window {
    Cypress: object;
    handleFromCypress: Function;
  }
}

if (window.Cypress) {
  const otherDomains: string[] = ['http://localhost:3000/']
  const methods = ['get', 'put', 'patch', 'post', 'delete']

  createServer({
    environment: 'test',
    routes() {
      for (const domain of ['/', ...otherDomains]) {
        for (const method of methods) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          this[method](`${domain}*`, async (_schema, request: Request) => {
            const [status, headers, body] = await window.handleFromCypress(
              request
            )
            return new Response(status, headers, body)
          })
        }
      }
    },
  })
}

createApp(App).mount('#app')
