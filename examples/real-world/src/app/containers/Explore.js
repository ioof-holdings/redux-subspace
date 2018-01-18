import { connect } from 'react-redux'
import Explore from '../components/Explore'

const mapStateToProps = (state) => ({
  githubRepo: state.configuration.GITHUB_REPO
})

export default connect(mapStateToProps)(Explore)
