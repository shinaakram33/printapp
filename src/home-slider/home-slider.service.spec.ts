import { Test, TestingModule } from '@nestjs/testing';
import { HomeSliderService } from './home-slider.service';

describe('HomeSliderService', () => {
  let service: HomeSliderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HomeSliderService],
    }).compile();

    service = module.get<HomeSliderService>(HomeSliderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
