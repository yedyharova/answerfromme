import { TestBed } from '@angular/core/testing';

import { LinkResolverService } from './link-resolver.service';

describe('LinkResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LinkResolverService = TestBed.get(LinkResolverService);
    expect(service).toBeTruthy();
  });
});
