import { Component } from 'react'

export default class UpdateUser extends Component {
    render() {
        return (
            <div>
                <div className="col-md-8">
                    <div className="card mb-3">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Full Name</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    Kenneth Valdez
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Email</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    fip@jukmuh.al
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Phone</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    (239) 816-9029
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Mobile</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    (320) 380-4539
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Address</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    Bay Area, San Francisco, CA
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-12">
                                    <a className="btn btn-info " target="__blank" href="https://www.bootdey.com/snippets/view/profile-edit-data-and-skills">Edit</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
