import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ITextItem } from '../../models';

export type IsFetchingInput = boolean;
export type PostsInput = ITextItem[];

@Component({
  selector: 'example-list',
  templateUrl: 'example-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleList {
  @Input() public posts: PostsInput;
  @Input() public isFetching: IsFetchingInput;
}
