import { Test, TestingModule } from '@nestjs/testing';
import { HomeSliderController } from './home-slider.controller';

describe('HomeSliderController', () => {
  let controller: HomeSliderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HomeSliderController],
    }).compile();

    controller = module.get<HomeSliderController>(HomeSliderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
