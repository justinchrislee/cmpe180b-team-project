import React from 'react';
import Landing from './Landing';
import Advertiser from './Advertiser';
import Publisher from './Publisher';
import { connect } from 'react-redux';

class Home extends React.Component {
    renderContent() {
        if (this.props.auth == null) {
            return;   
        } else if (this.props.auth == false) {
           return (
                <Landing />
            );
        } else {
            if (this.props.auth.Advertiser_Name) {
                return (<Advertiser auth={this.props.auth} />);
            } else {
                return (<Publisher auth={this.props.auth} />);
            }
        }    
    }
    
    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Home);