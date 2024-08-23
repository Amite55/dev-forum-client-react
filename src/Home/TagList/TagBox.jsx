import PropTypes from 'prop-types'
import queryString from 'query-string';
import { useNavigate, useSearchParams } from 'react-router-dom';
const TagBox = ({ label, icon: Icon }) => {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();

  const tags = params.get('tags');

  const handleSubmit = () => {
    let currentQuery = {tags: label};
    const url = queryString.stringifyUrl({
      url: '/',
      query: currentQuery
    })
    navigate(url)
  }

  return (
    <div
    onClick={handleSubmit}
      className={`
  flex 
  flex-col 
  items-center 
  justify-center 
  gap-2
  p-3
  border-b-2
  hover:text-neutral-800
  transition
  cursor-pointer
  ${tags === label && 'border-b-neutral-700 text-neutral-700'}
  `}
    >
      <Icon size={26} />
      <div className='text-sm font-medium'>{label}</div>
    </div>
  )
}

TagBox.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.elementType,
}

export default TagBox