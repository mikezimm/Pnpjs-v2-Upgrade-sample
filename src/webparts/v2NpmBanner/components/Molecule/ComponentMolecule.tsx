import * as React from 'react';
import stylesM from './molecule.module.scss';
import { ILoadPerformance, ILoadPerformanceOps } from './Interfaces/IPerformance';
import { MockPerformance } from './Interfaces/MockData';
import { createPerformanceTableVisitor, createBasePerformanceInit } from './Atoms/ComponentAtoms';
import { DisplayMode } from './Interfaces/displayMode';

export interface ISourcePagesProps {}
export interface ISourcePagesState {
  nothingHere: boolean;
}

export default class SourcePages extends React.Component<ISourcePagesProps, ISourcePagesState> {

  private _performance: ILoadPerformance;

  public constructor(props:ISourcePagesProps){
    super(props);
    //Just so it's initialized as empty fromt he start
    this._performance = createBasePerformanceInit( DisplayMode.Read, true );
    this.state = {
      nothingHere: true,
    };
  }

  public async componentDidMount(): Promise<void> {
    //At some point, this gets updated so this just simulates getting this final data
    this._performance = { ...this._performance, ...MockPerformance, };
  }

  public componentDidUpdate(prevProps: ISourcePagesProps): void { return }

  public render(): React.ReactElement<ISourcePagesProps> {

    const keysToShow: ILoadPerformanceOps[] = [ 'fetch0',  'fetch1',  'fetch2',  'fetch3',  'fetch4',  'fetch5',  'fetch6',  'fetch7',  'fetch8',  'fetch9'  ];
    const PerformanceElement = createPerformanceTableVisitor( this._performance, keysToShow );

    return (
      <div className={ stylesM.moleculeContainer }>
        { PerformanceElement }
      </div>
    );
  }

}
