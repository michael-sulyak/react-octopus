import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { UserListBlock } from './blocks'


class UserList extends Component {
    componentDidMount() {
        this.props.getUserList({ page: 3 })
    }

    render() {
        const { userList } = this.props

        return (
            <div className="App">
                <h1 className="App-title">UserList</h1>

                {userList.loading && <div>Loading...</div>}
                {!!userList.value && userList.value.map((user, i) => (
                    <div key={user.id}>
                        {i + 1}. {user.first_name} {user.last_name}
                    </div>
                ))}
                <br />
                <a
                    href="https://github.com/expert-m/react-octopus/tree/master/examples/client"
                    target="_blank"
                    rel="noopener noreferrer"
                >GitHub</a>
            </div>
        )
    }
}

UserList.propTypes = {
    userList: PropTypes.object,
    getUserList: PropTypes.func,
}

const mapStateToProps = (state) => ({
    userList: state.users.list,
})

const mapDispatchToProps = (dispatch) => ({
    getUserList: bindActionCreators(UserListBlock.get, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(UserList)
