import React from 'react'

const Success = ({success}) => {
  return (
    <div>
        <div class="alert alert-success" role="alert">
            {success}
</div>
    </div>
  )
}

export default Success