import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Image from "next/image";
import {
  XMarkIcon,
  StarIcon,
  ClockIcon,
  FireIcon,
} from "@heroicons/react/24/outline";
import { Exercise } from "../types/exercise";

interface ExerciseDetailProps {
  exercise: Exercise | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ExerciseDetail({
  exercise,
  isOpen,
  onClose,
}: ExerciseDetailProps) {
  if (!exercise) return null;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-dark-lighter p-6 shadow-xl transition-all">
                <div className="relative">
                  <button
                    onClick={onClose}
                    className="absolute right-0 top-0 p-2 rounded-full hover:bg-dark"
                  >
                    <XMarkIcon className="w-6 h-6 text-gray-400" />
                  </button>

                  <div className="flex flex-col lg:flex-row gap-8">
                    {/* Video/GIF Section */}
                    <div className="lg:w-2/3">
                      <div className="relative aspect-video rounded-xl overflow-hidden bg-dark">
                        <Image
                          src={exercise.gifUrl}
                          alt={`${exercise.name} demonstration`}
                          fill
                          className="object-contain"
                          priority
                        />
                      </div>
                    </div>

                    {/* Info Section */}
                    <div className="lg:w-1/3">
                      <Dialog.Title
                        as="h3"
                        className="text-2xl font-bold text-white mb-4"
                      >
                        {exercise.name}
                      </Dialog.Title>

                      <div className="space-y-6">
                        {/* Stats */}
                        <div className="flex items-center space-x-6 text-sm">
                          <div className="flex items-center text-yellow-500">
                            <StarIcon className="w-5 h-5 mr-1" />
                            <span>{exercise.rating.toFixed(1)}</span>
                          </div>
                          <div className="flex items-center text-gray-400">
                            <ClockIcon className="w-5 h-5 mr-1" />
                            <span>{Math.floor(exercise.duration / 60)}m</span>
                          </div>
                          <div className="flex items-center text-orange-500">
                            <FireIcon className="w-5 h-5 mr-1" />
                            <span>{exercise.calories} cal</span>
                          </div>
                        </div>

                        {/* Category & Difficulty */}
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-400">Category:</span>
                            <span className="text-white">
                              {exercise.category}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-400">Difficulty:</span>
                            <span className="text-white">
                              {exercise.difficulty}
                            </span>
                          </div>
                        </div>

                        {/* Muscle Groups */}
                        <div className="space-y-2">
                          <h4 className="text-gray-400">Target Muscles:</h4>
                          <div className="flex flex-wrap gap-2">
                            {exercise.muscleGroups.primary.map((muscle) => (
                              <span
                                key={muscle}
                                className="px-2 py-1 text-sm bg-primary bg-opacity-20 text-primary rounded-md"
                              >
                                {muscle}
                              </span>
                            ))}
                          </div>
                          {exercise.muscleGroups.secondary.length > 0 && (
                            <>
                              <h4 className="text-gray-400 mt-2">
                                Secondary Muscles:
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {exercise.muscleGroups.secondary.map(
                                  (muscle) => (
                                    <span
                                      key={muscle}
                                      className="px-2 py-1 text-sm bg-gray-700 text-gray-300 rounded-md"
                                    >
                                      {muscle}
                                    </span>
                                  )
                                )}
                              </div>
                            </>
                          )}
                        </div>

                        {/* Equipment */}
                        <div className="space-y-2">
                          <h4 className="text-gray-400">Equipment Needed:</h4>
                          <div className="flex flex-wrap gap-2">
                            {exercise.equipment.map((item) => (
                              <span
                                key={item}
                                className="px-2 py-1 text-sm bg-dark text-gray-300 rounded-md"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Instructions */}
                        <div className="space-y-2">
                          <h4 className="text-gray-400">Instructions:</h4>
                          <ol className="list-decimal list-inside space-y-2 text-gray-300">
                            {exercise.instructions.map((instruction, index) => (
                              <li key={index}>{instruction}</li>
                            ))}
                          </ol>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-4 pt-4">
                          <button className="flex-1 bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                            Start Workout
                          </button>
                          <button className="flex-1 bg-dark hover:bg-dark-darker text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                            Add to Routine
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
