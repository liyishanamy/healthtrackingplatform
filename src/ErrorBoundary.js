import React, {Component} from 'react';


class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: null, errorInfo: null };
    }

    static getDerivedStateFromError = error => {
        return { hasError: true };
    };
    componentDidCatch(error, errorInfo) {
        console.log("error",error, errorInfo)
        // Catch errors in any components below and re-render with error message
        this.setState({
            error: error,
            errorInfo: errorInfo
        })
    }

    render() {
        if (this.state.errorInfo) {
            return (
                <div>Something went wrong!</div>
            );
        }
        return this.props.children;
    }
}
export default ErrorBoundary;