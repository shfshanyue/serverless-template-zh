import { Helmet } from 'react-helmet'

export default () => (
  <>
    <Helmet
      title="Home | Hello next.js!"
      meta={[{ property: 'og:title', content: 'Home' }]}
    />
    <div>Hello World!</div>
  </>
)
