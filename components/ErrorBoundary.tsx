import Image from 'next/image';
import { Component, ErrorInfo, ReactNode } from 'react';
import image from '../public/assets/error-img.png';
import styled from '../styles/errorBoundary.module.css';
import Link from 'next/link';

interface ErrorBoundaryProps {
  children: ReactNode;
}
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: undefined,
      errorInfo: undefined,
    };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo });
    console.error('Error Boundary caught an error:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div id={styled.error_page}>
          <div className={styled.error_content}>
            <div className="p-3" style={{ fontSize: '40px' }}>
              <Image src={image} width={250} height={250} alt="Error Image" />
            </div>
            <h4 data-text="Oops, Something Went Wrong!">
              Oops, Something Went Wrong!
            </h4>
            <p>
              Sorry, Our engineers are currently fixing something.
              <br />
              We expect them to be done soon.
            </p>
            <div className={styled.error_btns}>
              <Link href="/">Refresh Page</Link>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
