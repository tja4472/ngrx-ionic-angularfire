import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { TextItem } from '../../models';

export type IsFetchingInput = boolean;
export type PostsInput = TextItem[];

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'example-list',
  templateUrl: 'example-list.component.html',
})
export class ExampleList {
  @Input() public posts: PostsInput;
  @Input() public isFetching: IsFetchingInput;
}
