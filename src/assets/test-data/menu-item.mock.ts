import { MenuItem } from '../../app/modules/shared/model/menu-item.model';
import { doesExist } from '../../app/modules/shared/utilities/common-util/common.util';

/**
 * Returns a MenuItem instance with test ID and label only.
 * @param  {string} inc? If provided, will append to ID (kebab-case) and Label (space lead)
 */
export function getTestMenuItem(inc?: string): MenuItem {
  return new MenuItem(
    ''.concat('test-item', doesExist(inc) ? `-${inc}` : ''),
    ''.concat('Test Item', doesExist(inc) ? ` ${inc}` : '')
  );
}
