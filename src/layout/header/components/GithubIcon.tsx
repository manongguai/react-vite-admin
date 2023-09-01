import IconFont from '@/components/Iconfont'
import { GitHubUrl } from '@/config/config'

const GithubIcon = () => {
  return (
    <div className="header-icon" id="driver-github">
      <IconFont
        onClick={() => window.open(GitHubUrl, '__blank')}
        style={{ fontSize: '20px' }}
        type="icon-github"
      ></IconFont>
    </div>
  )
}
export default GithubIcon
